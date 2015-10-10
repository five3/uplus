def singleton(className):
    def wrapped():
        it =  className.__dict__.get('__it__')
        if it is not None:
            return it

        className.__it__=className()
        return className.__it__
    return wrapped

def mk_md5(s):
    import hashlib
    m = hashlib.md5()
    m.update(s)
    return m.hexdigest()

def warp_data(data):
    data = dict(data)
    for k,v in data.items():
        if isinstance(v, list):
            if len(v)>1:
                data[k] = ','.join(v)
            elif len(v)==1:
                data[k] = v[0]
            else:
                data[k] = ''
        else:
            data[k] = ''
    return data

def now():
    import time
    return time.strftime('%Y-%m-%d %X', time.localtime() )

def handle_uploaded_file(f):
    destination = open('static/upload/%s' % f.name,'wb')
    for chunk in f.chunks():
        destination.write(chunk)
    destination.close()
    return True