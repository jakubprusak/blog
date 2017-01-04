CREATE TABLE [dbo].[Post]
(
	[PostId] INT NOT NULL IDENTITY, 
	[MainImageUri] NVARCHAR(500) NULL, 
    [Title] NVARCHAR(2000) NOT NULL, 
	[TitleSlug] nvarchar(2000) not null,
    [SubTitle] NVARCHAR(2000) NULL, 
    [Writter] NVARCHAR(225) NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [DateAdded] DATETIME NOT NULL DEFAULT getdate(), 
    [Content] NVARCHAR(MAX) NOT NULL, 
    [Published] BIT NOT NULL DEFAULT 0, 
    CONSTRAINT [PK_Post] PRIMARY KEY ([PostId]) 
)
