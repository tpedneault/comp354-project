from flask import Flask
from flask_cors import CORS, cross_origin
import pandas as pd

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
df = pd.read_csv("./books_database.csv")

@app.route('/api/recommendations/<isbns_str>', methods = ['GET'])
@cross_origin()
def recommendations(isbns_str):
    isbns = isbns_str.split(",")
    recommended = []
    for isbn in isbns:
        result = content_based_recommender(isbn)
        for book in result:
            if isinstance(book, tuple):
                recommended.append(f"'{book[0]}'")
            else:
                recommended.append(f"'{book}'")
    return ",".join(recommended)

def content_based_recommender(isbn):
    book_title = isbn
    if book_title in df['isbn'].values:
        rating_counts = pd.DataFrame(df['isbn'].value_counts())
        rare_books = rating_counts[rating_counts['isbn'] <= 10].index
        common_books = df[~df['isbn'].isin(rare_books)]
        
        if book_title in rare_books:
            random = pd.Series(common_books['isbn'].unique()).sample(1).values
            return random
        else:
            common_books = common_books.drop_duplicates(subset=['isbn'])
            common_books.reset_index(inplace= True)
            common_books['index'] = [i for i in range(common_books.shape[0])]
            target_cols = ['title','author','publisher','category']
            common_books['combined_features'] = [' '.join(common_books[target_cols].iloc[i,].values) for i in range(common_books[target_cols].shape[0])]
            cv = CountVectorizer()
            count_matrix = cv.fit_transform(common_books['combined_features'])
            cosine_sim = cosine_similarity(count_matrix)
            index = common_books[common_books['isbn'] == book_title]['index'].values[0]
            sim_books = list(enumerate(cosine_sim[index]))
            sorted_sim_books = sorted(sim_books,key=lambda x:x[1],
                                      reverse=True)[1:6]
            
            books = []
            for i in range(len(sorted_sim_books)):
                books.append(common_books[common_books['index'] == sorted_sim_books[i][0]]['isbn'].item())
            
            # Change the index in sorted_sim_books to the ibsn of the books
            for i in range(len(sorted_sim_books)):
                sorted_sim_books[i] = (books[i], sorted_sim_books[i][1])
                
            return sorted_sim_books
    else:
        return None

if __name__ == "__main__":
    app.run(debug=True)
