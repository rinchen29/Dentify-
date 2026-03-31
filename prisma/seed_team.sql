INSERT INTO "team_members" ("id","name","designation","experience","description","sortOrder","isActive","createdAt","updatedAt")
VALUES
  (gen_random_uuid()::text, 'Dr. Alexandra Chen',  'Cosmetic Dentistry & Implants', '18 Years', 'Dr. Chen brings 18 years of expertise in smile transformations, combining artistry with advanced cosmetic and implant techniques.', 1, true, NOW(), NOW()),
  (gen_random_uuid()::text, 'Dr. Marcus Williams', 'Orthodontics & Aligners',       '12 Years', 'Specialising in digital treatment planning and clear aligners, Dr. Williams has helped thousands achieve perfectly aligned smiles.', 2, true, NOW(), NOW()),
  (gen_random_uuid()::text, 'Dr. Priya Sharma',    'Endodontics & Periodontics',    '10 Years', 'Dr. Sharma is renowned for her gentle approach to complex root canal procedures and advanced gum care treatments.', 3, true, NOW(), NOW())
ON CONFLICT DO NOTHING;
