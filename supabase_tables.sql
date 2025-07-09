-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  project_url text,
  github_url text,
  technologies text[],
  category text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog Posts Table
create table if not exists blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  cover_image text,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  tags text[]
);

-- Skills Table
create table if not exists skills (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text,
  proficiency smallint,
  icon_name text,
  order_index smallint default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Work Experience Table
create table if not exists work_experience (
  id uuid default uuid_generate_v4() primary key,
  company text not null,
  position text not null,
  start_date date not null,
  end_date date,
  current boolean default false,
  description text[],
  logo_url text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Form Submissions
create table if not exists contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new' check (status in ('new', 'replied', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ip_address text
);

-- Education Table
create table if not exists education (
  id uuid default uuid_generate_v4() primary key,
  institution text not null,
  degree text not null,
  field_of_study text,
  start_date date not null,
  end_date date,
  gpa numeric(3,2),
  description text[],
  logo_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Testimonials Table
create table if not exists testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  position text,
  company text,
  content text not null,
  avatar_url text,
  rating smallint check (rating between 1 and 5),
  approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site Settings Table
create table if not exists site_settings (
  id uuid default uuid_generate_v4() primary key,
  setting_key text not null unique,
  setting_value text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tags/Categories Table
create table if not exists tags (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Media Table
create table if not exists media (
  id uuid default uuid_generate_v4() primary key,
  file_name text not null,
  file_url text not null,
  file_type text,
  file_size bigint,
  alt_text text,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid
);

-- Create indexes for better performance
create index idx_projects_category on projects(category);
create index idx_blog_posts_published on blog_posts(published, published_at);
create index idx_skills_category on skills(category);
create index idx_work_exp_company on work_experience(company);
create index idx_education_institution on education(institution);
create index idx_testimonials_approved on testimonials(approved);
create index idx_tags_type on tags(type);

-- Enable Row Level Security (RLS) for all tables
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table skills enable row level security;
alter table work_experience enable row level security;
alter table contact_submissions enable row level security;
alter table education enable row level security;
alter table testimonials enable row level security;
alter table site_settings enable row level security;
alter table tags enable row level security;
alter table media enable row level security;

-- Create policies for public read access
create policy "Public projects are viewable by everyone." on projects
  for select using (true);

create policy "Public blog posts are viewable by everyone." on blog_posts
  for select using (published = true);

create policy "Skills are viewable by everyone." on skills
  for select using (true);

create policy "Work experience is viewable by everyone." on work_experience
  for select using (true);

create policy "Education is viewable by everyone." on education
  for select using (true);

create policy "Approved testimonials are viewable by everyone." on testimonials
  for select using (approved = true);

-- Insert some default settings
insert into site_settings (setting_key, setting_value, description)
values 
  ('site_title', 'My Portfolio', 'The main title of the website'),
  ('site_description', 'A personal portfolio website', 'The meta description for SEO'),
  ('contact_email', 'your.email@example.com', 'Email address for contact form submissions'),
  ('posts_per_page', '10', 'Number of blog posts to show per page')
on conflict (setting_key) do nothing;
