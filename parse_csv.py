import csv


with open('books_import.sql', 'w') as sql_out:
    with open('books.csv', 'r') as csv_in:
        reader = csv.reader(csv_in, quotechar='"')
        existing_isbns = []
        index = 0
        for row in reader:
            if existing_isbns.count(row[1]) > 0:
                continue
            existing_isbns.append(row[1])
            row = [str.replace("\"", "'") for str in row]
            lines = [
                f'INSERT INTO books (id, title, author, publisher, cover_url, category)',
                'VALUES',
                f'\t("{row[1]}","{row[3]}","{row[4]}","{row[5]}","{row[6]}","{row[8]}");\n'
            ]
            sql_out.write("\n".join(lines))
            index += 1
            print(f"Added book index={index}")
        sql_out.close()

