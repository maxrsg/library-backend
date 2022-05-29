\c "Library"

CREATE VIEW "view_items"
AS
SELECT "LibraryItems"."Id", "LibraryItems"."CategoryId", "LibraryItems"."Title", "LibraryItems"."Author", "LibraryItems"."Pages", "LibraryItems"."RunTimeMinutes", "LibraryItems"."IsBorrowable", "LibraryItems"."Borrower", "LibraryItems"."BorrowDate", "LibraryItems"."Type", "Category"."CategoryName"
FROM "LibraryItems"
INNER JOIN "Category"
    ON "LibraryItems"."CategoryId" = "Category"."Id"