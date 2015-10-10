from main.foo import fetchall, fetchone

def get_article_list(cate):
    sql = '''select * from articles where category_id=%s limit 0,10''' % cate
    return fetchall(sql)

def get_article_one(id):
    sql = '''select articles.title, articles.content, articles.tags, articles.create_date, auth_user.username
               from articles, auth_user where articles.id=%s and articles.user_id=auth_user.id'''  % id
    return fetchone(sql)

def get_next_article(id):
    sql = '''select id, title
               from articles where id>%s limit 0,1'''  % id
    return fetchone(sql)
    
def get_pre_article(id):
    sql = '''select id, title
               from articles where id<%s limit 0,1'''  % id
    return fetchone(sql)
