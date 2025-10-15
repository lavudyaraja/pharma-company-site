import { useState } from "react";
import Tablets from "@/components/Tablets";
import TabletViewer from "@/components/TabletViewer";
import { Button } from "@/components/ui/button";
import { Eye, Shield } from "lucide-react";

const TabletsPage = () => {
  const [viewMode, setViewMode] = useState<"viewer" | "admin">("viewer");

  return (
    <div className="min-h-screen bg-background">
      {/* Toggle Buttons */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center gap-4 mb-8">
          {/* <Button
            onClick={() => setViewMode("viewer")}
            variant={viewMode === "viewer" ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Tablet Viewer
          </Button> */}
          <Button
            onClick={() => setViewMode("admin")}
            variant={viewMode === "admin" ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Admin Panel
          </Button>
        </div>
      </div>

      {/* Content */}
      {/* <div className="container mx-auto px-4">
        {viewMode === "viewer" ? <TabletViewer /> : <Tablets />}
      </div> */}
    </div>
  );
};

export default TabletsPage;