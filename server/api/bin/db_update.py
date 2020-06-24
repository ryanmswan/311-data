import sys
from os.path import join, dirname
sys.path.append(join(dirname(__file__), '../src'))


if __name__ == '__main__':
    import db
    import pb
    import cache

    if hasattr(cache, 'clean'):
        cache.clean()

    db.requests.update()

    if pb.enabled:
        pb.populate()
    else:
        pb.clear_data()
