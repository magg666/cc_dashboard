def is_valid_format(data: dict):
    keys = data.keys()
    return 'url' in keys and 'plan' in keys and 'module' in keys


def is_valid_url(data: dict):
    url = data.get('url')
    try:
        part1 = str(url).split(':')
        part2 = part1[1].split("/")
        return part1[0] == 'https' and part2[2] == 'github.com' and len(part2) >= 5
    except IndexError:
        raise


def is_valid_plan(data: dict):
    plan = data.get('plan')
    if str(plan).startswith("http"):
        return True
    else:
        raise IndexError


def is_valid_module_id(data: dict):
    module_id = data.get('module')
    return isinstance(module_id, int)


def is_valid(data):
    return is_valid_format(data) and is_valid_url(data) and is_valid_plan(data) and is_valid_module_id(data)
