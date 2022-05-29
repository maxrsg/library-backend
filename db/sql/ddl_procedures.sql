\c "Library";

-- LibraryItems
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

CREATE PROCEDURE edit_item(
    "i_Id" INTEGER,
    "i_CategoryId" INTEGER,
    "i_Title" VARCHAR(200),
    "i_Author" VARCHAR(128),
    "i_Pages" INTEGER,
    "i_RunTimeMinutes" INTEGER,
    "i_IsBorrowable" BOOLEAN,
    "i_Borrower" VARCHAR(128),
    "i_BorrowDate" DATE,
    "i_Type" VARCHAR(64)
)
LANGUAGE plpgsql 
AS $$
BEGIN
    UPDATE "LibraryItems"
    SET "CategoryId" = "i_CategoryId", "Title" = "i_Title", "Author" = "i_Author", "Pages" = "i_Pages", "RunTimeMinutes" = "i_RunTimeMinutes", "IsBorrowable" = "i_IsBorrowable", "Borrower" = "i_Borrower", "BorrowDate" = "i_BorrowDate", "Type" = "i_Type"
    WHERE "Id" = "i_Id";
END;$$;

CREATE PROCEDURE remove_item(
"i_Id" int
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "LibraryItems"
    WHERE "Id" = "i_Id";
END;$$;

CREATE PROCEDURE show_item(
    "i_Id" INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT * FROM "LibraryItems"
    WHERE "Id" = "i_Id";
END;$$;

-- Category
CREATE PROCEDURE add_category(
    "c_CategoryName" VARCHAR(64),
    "c_Id" INOUT INTEGER DEFAULT null
)
LANGUAGE plpgsql 
AS $$
BEGIN
    INSERT INTO "Category"("CategoryName")
    VALUES ("c_CategoryName")
    RETURNING "Id" INTO "c_Id";
END;$$;

CREATE PROCEDURE edit_category(
    "c_Id" INTEGER,
    "c_CategoryName" VARCHAR(64)
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE "Category"
    SET "CategoryName" = "c_CategoryName"
    WHERE "Id" = "c_Id";
END;$$;

CREATE PROCEDURE remove_category(
"c_Id" int
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM "Category"
    WHERE "Id" = "c_Id";
END;$$;

-- Check out/in items
CREATE PROCEDURE borrow_item(
    "i_Id" int,
    "i_Borrower" VARCHAR(128),
    "i_BorrowDate" DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE "LibraryItems"
    SET "Borrower" = "i_Borrower", "BorrowDate" = "i_BorrowDate"
    WHERE "Id" = "i_Id";
END;$$;
