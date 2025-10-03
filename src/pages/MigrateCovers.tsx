import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { migrateCoverImages } from '@/utils/migrateCoverImages';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function MigrateCovers() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleMigrate = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      const migrationResults = await migrateCoverImages();
      setResults(migrationResults);
      
      const successCount = migrationResults.filter(r => r.status === 'success').length;
      const errorCount = migrationResults.filter(r => r.status === 'error').length;

      toast({
        title: 'Migration Complete',
        description: `${successCount} covers migrated successfully, ${errorCount} errors`,
      });
    } catch (error: any) {
      toast({
        title: 'Migration Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Migrate Cover Images</CardTitle>
          <CardDescription>
            Upload all cover images from the codebase to Supabase storage and create records in the Covers table
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleMigrate} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Migrating...' : 'Start Migration'}
          </Button>

          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Migration Results:</h3>
              {results.map((result, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2 rounded-md bg-muted text-sm"
                >
                  {result.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium">{result.tag}:</span>
                  <span className="text-muted-foreground">
                    {result.status === 'success' 
                      ? `Uploaded to ${result.storagePath}`
                      : result.message
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
