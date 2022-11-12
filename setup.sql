CREATE TABLE IF NOT EXISTS `books` (
    `id` varchar(10) NOT NULL,
    `title` varchar(255) NOT NULL,
    `year` int(4) NOT NULL,
    `publisher_id` int(10) NOT NULL,
    `author_id` int(10) NOT NULL,
    `cover_url` varchar(512) NOT NULL,

    FOREIGN KEY(author_id)
        REFERENCES authors(id)
        ON DELETE CASCADE,

    FOREIGN KEY(publisher_id)
        REFERENCES publishers(id)
        ON DELETE CASCADE,

    PRIMARY KEY (`id`) 
);

CREATE TABLE IF NOT EXISTS `users` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `email` varchar(254) NOT NULL,
    `password_md5` varchar(32) NOT NULL,
    `first_name` varchar(64) NOT NULL,
    `last_name` varchar(64) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `authors` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `full_name` varchar(255) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `publishers` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `ratings` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `user_id` int(10) NOT NULL,
    `book_id` varchar(10) NOT NULL,
    `rating` int(2) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `shelves` (
    `id` int(10) NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `book_favorites` (
    `user_id` int(10) NOT NULL,
    `book_id` int(10) NOT NULL,

    PRIMARY KEY(`user_id`, `book_id`)
);

CREATE TABLE IF NOT EXISTS `book_shelves` (
    `user_id` int(10) NOT NULL,
    `book_id` int(10) NOT NULL,
    `shelf_id` int(10) NOT NULL,

    PRIMARY KEY(`user_id`, `book_id`)
);