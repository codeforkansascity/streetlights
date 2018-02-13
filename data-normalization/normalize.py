#!/usr/bin/env python3
import json

from openpyxl import load_workbook


def import_leawood():
    wb = load_workbook('data/LS_Streetlights.xlsx')
    data = [[j.value for j in i] for i in wb['LS_Stretlights']]
    labels = data[0]
    rows = [
        {labels[i]: value for i, value in enumerate(row)}
        for row in data[1:]
    ]
    return rows


def main():
    leawood = import_leawood()
    formats = {
        'leawood': leawood[0]
    }
    # Display single examples for debugging
    print(json.dumps(formats, indent=4))


if __name__ == '__main__':
    main()
