-- AthleteOS Initial Seed Data

-- Sports
INSERT INTO public.sports (id, name, icon, category) VALUES
('cricket', 'Cricket', 'Bat', 'Team'),
('football', 'Football', 'Trophy', 'Team'),
('badminton', 'Badminton', 'Activity', 'Racquet'),
('running', 'Running', 'Zap', 'Athletics'),
('swimming', 'Swimming', 'Waves', 'Water'),
('basketball', 'Basketball', 'Circle', 'Team'),
('tennis', 'Tennis', 'Target', 'Racquet'),
('chess', 'Chess', 'Crown', 'Strategy')
ON CONFLICT (id) DO NOTHING;
