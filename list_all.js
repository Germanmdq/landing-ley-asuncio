
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listAllArticles() {
    console.log('Listing ALL articles...');

    const { data: articles, error } = await supabase
        .from('articulos')
        .select('id, titulo, slug, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Total articles:', articles.length);
    console.log(JSON.stringify(articles, null, 2));
}

listAllArticles();
