import { supabase } from '@/integrations/supabase/client';

// Local cover image imports
import coverBanks from '@/assets/cover-banks.jpg';
import coverTech from '@/assets/cover-tech.jpg';
import coverHealthcare from '@/assets/cover-healthcare.jpg';
import coverEnergy from '@/assets/cover-energy.jpg';
import coverConsumer from '@/assets/cover-consumer.jpg';
import coverInsurance from '@/assets/cover-insurance.jpg';

interface CoverMapping {
  tag: string;
  fileName: string;
  localUrl: string;
}

const coverMappings: CoverMapping[] = [
  { tag: 'Banks', fileName: 'cover-banks.jpg', localUrl: coverBanks },
  { tag: 'Tech', fileName: 'cover-tech.jpg', localUrl: coverTech },
  { tag: 'Healthcare', fileName: 'cover-healthcare.jpg', localUrl: coverHealthcare },
  { tag: 'Energy', fileName: 'cover-energy.jpg', localUrl: coverEnergy },
  { tag: 'Consumer', fileName: 'cover-consumer.jpg', localUrl: coverConsumer },
  { tag: 'Insurance', fileName: 'cover-insurance.jpg', localUrl: coverInsurance },
];

export async function migrateCoverImages() {
  const results = [];

  for (const mapping of coverMappings) {
    try {
      // Fetch the local image
      const response = await fetch(mapping.localUrl);
      const blob = await response.blob();

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(mapping.fileName, blob, {
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

      // Insert into Covers table (using any to bypass type checking since Covers table exists but isn't in generated types yet)
      const { error: coverError } = await (supabase as any)
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
    } catch (error: any) {
      results.push({ 
        tag: mapping.tag, 
        status: 'error', 
        message: error.message 
      });
    }
  }

  return results;
}
