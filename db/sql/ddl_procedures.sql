\c "Library";

CREATE PROCEDURE add_item(
    "i_CategoryId" INTEGER,
    "i_Title" VARCHAR(200),
    "i_Author" VARCHAR(128),
    "i_Pages" INTEGER,
    "i_RunTimeMinutes" INTEGER,
    "i_IsBorrowable" BOOLEAN,
    "i_Borrower" VARCHAR(128),
    "i_BorrowDate" DATE,
    "i_Type" VARCHAR(64),
    "i_Id" INOUT INTEGER DEFAULT null
)
LANGUAGE plpgsql 
AS $$
BEGIN
    INSERT INTO "LibraryItems"("CategoryId", "Title", "Author", "Pages", "RunTimeMinutes", "IsBorrowable", "Borrower", "BorrowDate", "Type")
    VALUES ("i_CategoryId", "i_Title", "i_Author", "i_Pages", "i_RunTimeMinutes", "i_IsBorrowable", "i_Borrower", "i_BorrowDate", "i_Type")
    RETURNING "Id" INTO "i_Id";
END;$$;

