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

      // Insert into Covers table with updated schema
      const { error: coverError } = await (supabase as any)
        .from('Covers')
        .upsert({
          name: mapping.fileName,
          category: mapping.tag,
          storage_path: uploadData.path,
          public_url: publicUrl,
          image: publicUrl,
        }, {
          onConflict: 'name',
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
        status: 'success', 
        url: publicUrl,
        storagePath: uploadData.path
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
