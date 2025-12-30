
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteMurphy() {
    console.log('Searching for Murphy articles...');

    const { data: articles, error: searchError } = await supabase
        .from('articulos')
        .select('id, titulo, slug')
        .or('slug.ilike.%murphy%,titulo.ilike.%murphy%');

    if (searchError) {
        console.error('Error searching:', searchError);
        return;
    }

    if (!articles || articles.length === 0) {
        console.log('No Murphy articles found.');
        return;
    }

    console.log(`Found ${articles.length} articles. Deleting...`);

    for (const article of articles) {
        const { error } = await supabase
            .from('articulos')
            .delete()
            .eq('id', article.id);

        if (error) {
            console.error(`Error deleting ${article.slug}:`, error);
        } else {
            console.log(`Successfully deleted: ${article.slug}`);
        }
    }
}

deleteMurphy();
