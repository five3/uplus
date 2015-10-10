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
    article = get_article_one(id)
    title = article[0]
    next_article = get_next_article(id)
    pre_article = get_pre_article(id)  
    return render_to_response('article.html', locals())

def detail(request):
    articles = get_article_list(3)
    return render_to_response('detail.html', locals())

def register(request):
    articles = get_article_list(3)
    return render_to_response('detail.html', locals())