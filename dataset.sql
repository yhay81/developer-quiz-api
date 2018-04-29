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
('Quick Open, Go to File', '⌘P', '⇧⌘P', '⌘K P', '⌘,', 4, 1);

COMMIT;