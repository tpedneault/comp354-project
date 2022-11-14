import pandas as pd
import numpy as np
import json

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def content_based_recommender(isbn, data):
    df = pd.read_csv(data)
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
            target_cols = ['book_title','book_author','publisher','Category']
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
        
        print('Cant find book in database, please check ISBN')
        return None
    
def get_recommendations(isbn_list, data):
    recommendations = []
    for isbn in isbn_list:
        recommendations.append(content_based_recommender(isbn, data))
    recommendations = [x for x in recommendations if isinstance(x, list)]
    recommendations = [item for sublist in recommendations for item in sublist]
    recommendations = sorted(recommendations, key=lambda t: t[1], reverse=True)
    # Remove all the second element of each tuple
    recommendations = [x[0] for x in recommendations]
    # Remove entry if it appears in the isbn_list
    recommendations = [x for x in recommendations if x not in isbn_list]
    return recommendations

def get_isbn_list(json_string):
    favorite_books = json.loads(json_string)
    isbn_list = []
    for book in favorite_books:
        isbn_list.append(book['isbn'])
    return isbn_list

def get_json_string(recommendations):
    json_string = json.dumps(recommendations)
    return json_string

# Step 1, send the books on the user's favorite shelf as a json string
# Step 2, get the isbn list from the json string (get_isbn_list)
# Step 3, get the recommendations (get_recommendations(isbn_list, 'books_database.csv'))
# Step 4, get the json string from the recommendations (get_json_string)
# Step 5, use the json string of ISBN codes to populate the recommendations shelf

