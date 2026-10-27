import {db} from '../lib/supabase';import {Article,ArticleRow} from '../types/article';
const fail=(e:{message:string;code?:string})=>{throw new Error(e.code==='23505'?'That slug is already used by another article. Edit the slug and try again.':e.message)};
const rows=async(q:PromiseLike<{data:unknown;error:{message:string;code?:string}|null}>)=>{const{data,error}=await q;if(error)fail(error);return(data??[]) as ArticleRow[]};
export const fromRow=(r:ArticleRow):Article=>({id:r.id,slug:r.slug,title:r.title,summary:r.summary,content:r.content,category:r.category,image:r.image_url??'',alt:r.image_alt??r.title,author:r.author_name,publisher:r.source_name??'Tech Lah',date:r.published_at??r.created_at,publishedAt:r.published_at,status:r.status,featured:r.is_featured,sponsored:r.is_sponsored,minutes:r.reading_time_minutes??1,url:r.external_url??'',tags:r.tags??[],createdBy:r.created_by??null});
const toRow=(a:Article)=>({title:a.title,slug:a.slug,summary:a.summary,content:a.content,category:a.category,image_url:a.image||null,image_alt:a.alt||null,author_name:a.author,source_name:a.publisher||null,
  // Keep an existing publication date; set one only when first publishing.
  published_at:a.status==='published'?(a.publishedAt??new Date().toISOString()):a.publishedAt,
  status:a.status,is_featured:a.featured,is_sponsored:a.sponsored,external_url:a.url||null,reading_time_minutes:a.minutes,tags:a.tags});

// ---- Public reads: always filtered to status = 'published' in the query itself.
const pub=()=>db().from('articles').select('*').eq('status','published');
export const latestPublished=async(limit=20)=>(await rows(pub().order('published_at',{ascending:false}).limit(limit))).map(fromRow);
export const featuredPublished=async(limit=5)=>(await rows(pub().eq('is_featured',true).order('published_at',{ascending:false}).limit(limit))).map(fromRow);
export const byCategory=async(cat:string,limit=12,oldestFirst=false)=>(await rows(pub().eq('category',cat).order('published_at',{ascending:oldestFirst}).limit(limit))).map(fromRow);
export const bySlug=async(slug:string)=>{const r=await rows(pub().eq('slug',slug).limit(1));return r[0]?fromRow(r[0]):null};
export const searchPublished=async(q:string,limit=30)=>{const s=q.replace(/[,()%*\\]/g,' ').trim();if(!s)return latestPublished(limit);
  return(await rows(pub().or(`title.ilike.%${s}%,summary.ilike.%${s}%`).order('published_at',{ascending:false}).limit(limit))).map(fromRow)};
// Popularity tracking is not implemented, so there is no "most popular" query yet.

// ---- Editorial writes/reads: row-level policies distinguish admins from editors.
export const adminList=async()=>(await rows(db().from('articles').select('*').order('created_at',{ascending:false}))).map(fromRow);
export const editorList=async(userId:string)=>(await rows(db().from('articles').select('*').eq('created_by',userId).order('created_at',{ascending:false}))).map(fromRow);
export const createArticle=async(a:Article,userId:string)=>{await rows(db().from('articles').insert({...toRow(a),created_by:userId}))};
export const updateArticle=async(a:Article)=>{await rows(db().from('articles').update(toRow(a)).eq('id',a.id))};
export const setStatus=async(a:Article,status:Article['status'])=>updateArticle({...a,status});
export const deleteArticle=async(id:string)=>{await rows(db().from('articles').delete().eq('id',id))};
