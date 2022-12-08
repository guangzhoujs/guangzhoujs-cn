import { fetchRequest } from '@/utils/request'

// 文章列表
export const fetchArticleList = (params?: any) => fetchRequest({ api: 'article/list', ...params })
// 新增文章
export const fetchArticleInsert = (params?: any) => fetchRequest({ api: 'article/insert', ...params })
// 更新文章
export const fetchArticleUpdate = (params?: any) => fetchRequest({ api: 'article/update', ...params })
// 删除文章
export const fetchArticleDelete = (params?: any) => fetchRequest({ api: 'article/delete', ...params })
// 文章详情
export const fetchArticleDetail = (params?: any) => fetchRequest({ api: 'article/detail', ...params })
// 英雄列表
export const fetchUserList = (params: any) => fetchRequest({ api: 'user/list', ...params })
// 文章分类列表
export const fetchArticleCategory = (params?: any) => fetchRequest({ api: 'article/category/list', ...params })
// 评论列表
export const fetchCommentList = (params?: any) => fetchRequest({ api: 'comment/list', ...params })
// 新增评论
export const fetchCommentInsert = (params?: any) => fetchRequest({ api: 'comment/insert', ...params })
// 用户登录
export const fetchUserLogin = (params?: any) => fetchRequest({ api: 'login', ...params })
// 用户注册
export const fetchUserRegister = (params?: any) => fetchRequest({ api: 'register', ...params })
// 评论列表
export const fetchTagsList = (params?: any) => fetchRequest({ api: 'tags/list', ...params })
// 点赞
export const fetchArticleLikes = (params?: any) => fetchRequest({ api: 'article/likes', ...params })
