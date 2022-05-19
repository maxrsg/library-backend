\c "Library";

DROP TABLE IF EXISTS "Category";
DROP TABLE IF EXISTS "LibraryItems";

CREATE TABLE "Category" (
    "Id" SERIAL PRIMARY KEY NOT NULL,
    "CategoryName" VARCHAR(64)
);

CREATE TABLE "LibraryItems" (
    "Id" SERIAL PRIMARY KEY NOT NULL,
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
