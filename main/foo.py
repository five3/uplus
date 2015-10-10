from django.db import connection, transaction

def get_cursor():
    return connection.cursor()

def fetchone(sql):
    cursor = get_cursor()
    cursor.execute(sql)  
    return cursor.fetchone()     

def fetchall(sql):
    cursor = get_cursor()
    cursor.execute(sql)  
    return cursor.fetchall()     

def modify(sql):
    cursor = get_cursor()
    s = cursor.execute(sql)
    transaction.commit()
    return s

