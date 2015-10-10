#encoding: utf-8
__author__ = 'macy'

from model import *
from utils import function as fun

def get_cate_list(): 
        sql = '''select id,  name as title from category''' 
        # print sql
        return unio().fetchAll(sql)

def get_post_info(id):
    sql = '''select post.id, post.title, post.content, cate.id as cate, post.tags
            from articles post, category cate
            where post.id=%s and post.category_id=cate.id''' % id
    # print sql
    return unio().fetchOne(sql)

def get_post_list(req, page=1, num=10):
    index = (int(page)-1)*num
    sql = '''select post.id, post.title, post.content, post.create_date, category.name as cate
            from articles post, category
            where post.category_id=category.id
            order by post.create_date desc limit %s,%s''' % (index, num)
    # print sql
    return unio().fetchAll(sql)

def save_post(req, data):
    id = data.get('id', 0)
    views = data.get('views')
    if not views:
        views = 0
    if id:  ##update
        sql = '''update articles set title='%s', content='%s', update_date='%s', category_id=%s, tags='%s'  
                where id=%s''' % (data.get('title'), data.get('editorValue'), fun.now(), data.get('cate'), data.get('tags'), id) 
        # print sql 
        return unio().execute(sql) 
    else:
        sql = '''insert into articles (title, content, create_date, user_id, category_id)  
                values ('%s', '%s', '%s', '%s', '%s')''' % \
                  (data.get('title','no title'), data.get('editorValue'),  fun.now(), 1, data.get('cate'))
        # print sql
        return unio().executeInsert(sql)


def del_post(id):
    sql = '''delete from articles where id=%s''' % id
    return unio().execute(sql)

def get_comment_list(req, page=1, num=10):
#     index = (int(page)-1)*num
#     sql = '''select id, comment, user_name, submit_date
#             from django_comments
#             where is_removed=0 and site_id=%s order by submit_date desc limit %s,%s''' % (1, index, num)
#     return unio().fetchAll(sql)
    return None

def get_comment_info(id):
#     sql = '''select id, comment from django_comments where id=%s''' % id
#     return unio().fetchOne(sql)
    return None

def save_comment(data):
#     id = data.get('id')
#     comment = data.get('comment', 'no content')
#     if id:
#         sql = '''update django_comments set comment='%s' where id=%s''' % (comment, id)
#         return unio().execute(sql)
#     else:
#         sql = ''''''
    return None

def del_comment(id):
#     sql = '''update django_comments set is_removed=1 where id=%s''' % id
#     return unio().execute(sql)
    return None

def get_gbook_list(req, page, num=10):
    if page:
        page = int(page)
    else:
        page = 1
    index = (page-1)*num
    sql = '''select id, name, tel, created from ww_gbook where site_id=%s limit %s,%s''' % (1, index, num)
    # print sql
    return unio().fetchAll(sql)  

def del_gbook(id):
    sql = '''delete from ww_gbook where id=%s''' % id
    return unio().execute(sql)

def get_gbook_info(id):
    sql = '''select name, tel, content from ww_gbook where id=%s''' % id
    r = unio().fetchOne(sql)
    return '''<div class="Murphy fl">
             <div class="Murphy_list fl"><strong>用户名称</strong><p>%s</p></div>
             <div class="Murphy_list fl"><strong>联系方式</strong><p>%s人</p></div>
             <div class="Murphy_list fl"><strong>留言内容</strong><p>%s</p></div></div>''' % (
            r['name'], r['tel'], r['content'])

def auth(req, data):
    from django.contrib.auth import authenticate, login
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        login(req, user)
        return True

def get_user_list(req, page, num=10):
    if page:
        page = int(page)
    else:
        page = 1
    index = (page-1)*num
    sql = '''select id, username, created, regip, status,utype from ww_member where site_id=%s order by created desc limit %s,%s''' % (
        1, index, num)
    # print sql
    return unio().fetchAll(sql)

def get_user_pages(req, num=10):
    sql = '''select count(id) as pages from ww_member where site_id=%s''' % 1
#     print sql
    pages = unio().fetchOne(sql)
    if pages:
        count = pages['pages']
        if count % num==0:
            return count/num
        else:
            return count/num+1
    else:
        return 1

def audit_user(id, action):
    if action=='pass':
        status = 1
    else:
        status = 0
    sql = '''update ww_member set status=%s where id=%s''' % (status, id)
    # print sql
    return unio().execute(sql)

def reset_passwd(id):
    md5 = fun.mk_md5('000000')
    sql = '''update ww_member set password='%s' where id=%s''' % (md5, id)
    # print sql
    return unio().execute(sql)

def audit_post(data):
    sql = '''update blog_blogpost set status='%s' where id=%s''' % (data.get('status',1),data.get('id',0))
    # print sql
    if unio().execute(sql):
        return {'msg': 'success', 'errorCode' : 0}
    else:
        return {'msg': 'fail', 'errorCode' : -1}

def get_user_info(data):
    t = data.get('t')
    if t=='ktq':
        sql = '''select username, email, nickname, logo, utype,
                qiyeming, qiyewangzhi, lianxifangshi, qiyejianjie, zhuanye, zhuti
                from ww_member, ww_member_vip
                where ww_member.id=%s and ww_member.id=ww_member_vip.id''' % data.get('userid')
    else:
        sql = '''select username, email, nickname, logo, utype,
                xingming, shoujihao, qq, zuoyouming, gerenjianjie, zhiwei, sex
                from ww_member, ww_member_normal
                where ww_member.id=%s and ww_member.id=ww_member_normal.id''' % data.get('userid')
    # print sql
    return unio().fetchOne(sql)