BEGIN TRANSACTION;
INSERT INTO users (username,hashed_password) VALUES 
('Developer Quiz', ''),
('Anonymous', '');

INSERT INTO genres (genre_name) VALUES 
('Uncategorized'),
('General'),
('Git'),
('VS Code'),
('Unix commands'),
('Mac'),
('Windows'),
('HTTP'),
('Database'),
('Algorithm'),
('HTML/CSS'),
('JavaScript'),
('Programming Languages'),
('React'),
('Social facts');

INSERT INTO quizzes (quiz, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3, genre_id, author_id) VALUES 
('Keyboard Shortcuts', '⌘K ⌘S ', '⇧⌘P', '⌘K P', '⌘,', 4, 1),
('Quick Open, Go to File', '⌘P', '⇧⌘P', '⌘K P', '⌘,', 4, 1),
('Close editor', '⌘W', '⇧⌘P', '⌘K P', '⌘,', 4, 1),
('Split editor', '⌘\', '⇧⌘P', '⌘K P', '⌘,', 4, 1),
('Go to Definition', 'F12', 'F2', 'F5', 'F6', 4, 1),
('Rename Symbol', 'F2', 'F12', 'F5', 'F6', 4, 1),
('Undo last cursor operation', '⌘U', '⇧⌘P', '⌘K U', '⌘,', 4, 1),
('Toggle line comment', '⌘/', '⇧⌘P', '⌘K P', '⌘,', 4, 1),
('Go to beginning/end of file', '⌘↑ / ⌘↓ ', '⇧⌘↑ / ⇧⌘↓ ', '⌘U / ⌘D', '⌘T / ⌘B', 4, 1),
('Format document', '⇧⌥F', '⇧⌘P', '⌘K P', '⌘,', 4, 1);

COMMIT;