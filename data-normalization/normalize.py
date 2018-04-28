#!/usr/bin/env python3
import json
from csv import DictReader
from itertools import count

from stutil import rename_keys


value_limit = 1  # For debug

attributes = [
    'PoleID',
    'Longitude',
    'Latitude',
    'LightbulbType',
    'Wattage',
    'Lumens',
    'AttachedTech',
    'LightAttributes',
    'FiberWiFiEnabled',
    'PoleType',
    'PoleOwner',
    'DataSource'
]

base_items = {}  # Disabled for debug
# base_items = {attr: None for attr in attributes}


def convert_data(data, key_map: dict, value_map: dict):
    it = zip(data, range(1)) if value_limit > 0 else count()
    return [
        {
            **base_items,
            **rename_keys(row, key_map, value_map)
        } for row, _ in it
    ]


def load_csv(filename, key_map: dict = None, value_map: dict = None):
    print('Loading csv {}...'.format(filename))
    with open(filename) as csvfile:
        return convert_data(DictReader(csvfile), key_map or {}, value_map or {})


def main():
    data = {
        'kansas-city-mo-ks': load_csv('data/kansas-city-mo.csv'),
        'kcpl-mo-ks': load_csv('data/kcpl-mo-ks.csv'),
        'lee-summit-mo': load_csv('data/lee-summit-mo.csv')
    }

    # Display single examples for debugging
    print(json.dumps(data, indent=4))


if __name__ == '__main__':
    main()
