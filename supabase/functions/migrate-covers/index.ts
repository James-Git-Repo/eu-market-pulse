import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CoverMapping {
  tag: string;
  fileName: string;
  assetPath: string;
}

const coverMappings: CoverMapping[] = [
  { tag: 'Banks', fileName: 'cover-banks.jpg', assetPath: 'cover-banks.jpg' },
  { tag: 'Tech', fileName: 'cover-tech.jpg', assetPath: 'cover-tech.jpg' },
  { tag: 'Healthcare', fileName: 'cover-healthcare.jpg', assetPath: 'cover-healthcare.jpg' },
  { tag: 'Energy', fileName: 'cover-energy.jpg', assetPath: 'cover-energy.jpg' },
  { tag: 'Consumer', fileName: 'cover-consumer.jpg', assetPath: 'cover-consumer.jpg' },
  { tag: 'Insurance', fileName: 'cover-insurance.jpg', assetPath: 'cover-insurance.jpg' },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const results = [];

    // Get the base URL for fetching assets from the deployed app
    const { baseUrl } = await req.json();
    
    if (!baseUrl) {
      throw new Error('baseUrl is required');
    }

    for (const mapping of coverMappings) {
      // Fetch the image from the deployed assets
      const assetUrl = `${baseUrl}/src/assets/${mapping.assetPath}`;
      const imageResponse = await fetch(assetUrl);
      
      if (!imageResponse.ok) {
        results.push({ 
          tag: mapping.tag, 
          status: 'error', 
          message: `Failed to fetch ${assetUrl}` 
        });
        continue;
      }

      const imageBlob = await imageResponse.blob();

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(mapping.fileName, imageBlob, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        results.push({ 
          tag: mapping.tag, 
          status: 'error', 
          message: uploadError.message 
        });
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(mapping.fileName);

      // Find article by tag
      const { data: articles, error: articleError } = await supabase
        .from('Articles')
        .select('id')
        .eq('tag', mapping.tag)
        .limit(1);

      if (articleError || !articles || articles.length === 0) {
        results.push({ 
          tag: mapping.tag, 
          status: 'error', 
          message: 'No article found with this tag' 
        });
        continue;
      }

      const articleId = articles[0].id;

      // Insert into Covers table
      const { error: coverError } = await supabase
        .from('Covers')
        .upsert({
          article_id: articleId,
          image_url: publicUrl,
        }, {
          onConflict: 'article_id',
        });

      if (coverError) {
        results.push({ 
          tag: mapping.tag, 
          status: 'error', 
          message: coverError.message 
        });
        continue;
      }

      results.push({ 
        tag: mapping.tag, 
        articleId, 
        status: 'success', 
        url: publicUrl 
      });
    }

    return new Response(
      JSON.stringify({ results }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
