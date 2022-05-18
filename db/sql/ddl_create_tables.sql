\c "Library";

DROP TABLE IF EXISTS "Category";
DROP TABLE IF EXISTS "LibraryItems";

-- CREATE SCHEMA library;
-- SHOW search_path;
-- SET search_path TO library;
-- SHOW search_path;

CREATE TABLE "Category" (
    "Id" INTEGER PRIMARY KEY NOT NULL,
    "CategoryName" VARCHAR(64)
);

CREATE TABLE "LibraryItems" (
    "Id" INTEGER PRIMARY KEY NOT NULL,
    "CategoryId" INTEGER NOT NULL,
    "Title" VARCHAR(200) NOT NULL,
    "Author" VARCHAR(128) NOT NULL,
    "Pages" INTEGER,
    "RunTimeMinutes" INTEGER,
    "IsBorrowable" BOOLEAN NOT NULL,
    "Borrower" VARCHAR(128),
    "BorrowDate" DATE,
    "Type" VARCHAR(64),

    CONSTRAINT "fk_CategoryId"
        FOREIGN KEY("CategoryId")
            REFERENCES "Category"("Id")
);

INSERT INTO "Category" VALUES(1, 'Fantasy');

INSERT INTO "LibraryItems" VALUES(1, 1, 'Test title', 'Test Testsson', 321, NULL, true, NULL, NULL, 'Book');