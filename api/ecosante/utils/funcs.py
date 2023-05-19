import csv
from io import StringIO


def generate_line(line):
    if not isinstance(line, list):
        line = list(line)
    stringio = StringIO()
    writer = csv.writer(stringio)
    writer.writerow(line)
    value = stringio.getvalue()
    stringio.close()
    return value


def convert_boolean_to_oui_non(value):
    return "Oui" if value else "Non"


def oxford_comma(items):
    if not items:
        return None
    items = list(items)
    length = len(items)
    if length == 0:
        return None
    if length == 1:
        return items[0]
    if length == 2:
        return f'{items[0]} et {items[1]}'
    prev = ', '.join(items[:-1])
    return f'{prev}, et {items[-1]}'


def display_check(check):
    return "✅" if check else "❌"
