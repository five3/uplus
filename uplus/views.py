#!/usr/bin/python
#coding:utf-8
from django.shortcuts import render_to_response
from main.foo import fetchall
from main.controller import * 

def home(request):
    home_active = 'header-menu-item-active'
    articles = get_article_list(3)
    return render_to_response('index.html', locals())

def product(request):
    product_active = 'header-menu-item-active'
    articles = get_article_list(3)
    return render_to_response('product.html', locals())

def service(request):
    service_active = 'header-menu-item-active'
    articles = get_article_list(3)
    return render_to_response('service.html', locals())

def template(request):
    template_active = 'header-menu-item-active'
    articles = get_article_list(3)
    index = (request.GET.get('page', 1)-1)*9
    sql = '''select * from templates limit %s,9'''  % index
    temp = fetchall(sql)
    return render_to_response('template.html', locals())

def about(request):
    about_active = 'header-menu-item-active'
    articles = get_article_list(3)
    return render_to_response('about.html', locals())

def article(request):
    articles = get_article_list(3)
    id = request.GET.get('id', 0)
    arti = get_article_one(id)
    if arti:
        title = arti[0]
    else:
        msg = '你查找的文章跟图片私奔了！有事请拨110'
        return render_to_response('msg.html', locals())
    next_article = get_next_article(id)
    pre_article = get_pre_article(id)  
    return render_to_response('article.html', locals())

def detail(request):
    articles = get_article_list(3)
    return render_to_response('detail.html', locals())

def register(request):
    articles = get_article_list(3)
    return render_to_response('detail.html', locals())

def feedback(request):
    articles = get_article_list(3)
    if request.method=='GET':
        return render_to_response('feedback.html', locals())
    elif request.method=='POST':
        data = request.POST
        if post_feedback(data):
            msg = '提交反馈成功!'
        else:
            msg = '提交反馈失败!'
        return render_to_response('msg.html', locals())

def yingxiao(request):
    articles = get_article_list(3)
    yingxiao = get_article_list(4)
    yxshipin = get_article_list(5)
    peixun = get_article_list(6)
    return render_to_response('yingxiao.html', locals())
