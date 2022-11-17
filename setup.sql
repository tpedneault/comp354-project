CREATE TABLE IF NOT EXISTS `books` (
    `id` varchar(10) NOT NULL,
    `title` varchar(255) NOT NULL,
    `year` int(4) NOT NULL,
    `publisher` varchar(255) NOT NULL,
    `author` varchar(255) NOT NULL,
    `cover_url` varchar(512) NOT NULL,

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

CREATE TABLE IF NOT EXISTS `ratings` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `user_id` int(10),
    `book_id` varchar(10) NOT NULL,
    `rating` int(2) NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY(book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,

    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `shelves` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,

    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `book_favorites` (
    `user_id` int(10) NOT NULL,
    `book_id` varchar(10) NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY(book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,

    PRIMARY KEY(`user_id`, `book_id`)
);

CREATE TABLE IF NOT EXISTS `book_shelves` (
    `user_id` int(10) NOT NULL,
    `book_id` varchar(10) NOT NULL,
    `shelf_id` int(10) NOT NULL,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY(book_id)
        REFERENCES books(id)
        ON DELETE CASCADE,

    FOREIGN KEY(shelf_id)
        REFERENCES shelves(id)
        ON DELETE CASCADE,

    PRIMARY KEY(`user_id`, `book_id`)
);
