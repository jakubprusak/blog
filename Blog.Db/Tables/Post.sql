CREATE TABLE [dbo].[Post]
(
	[PostId] INT NOT NULL IDENTITY, 
    [Title] NVARCHAR(2000) NOT NULL, 
    [SubTitle] NVARCHAR(2000) NULL, 
    [Writter] NVARCHAR(225) NOT NULL, 
    [Date] DATETIME NOT NULL, 
    [DateAdded] DATETIME NOT NULL DEFAULT getdate(), 
    [Content] NVARCHAR(MAX) NOT NULL, 
    CONSTRAINT [PK_Post] PRIMARY KEY ([PostId]) 
)
