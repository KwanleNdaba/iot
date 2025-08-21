import { useState, useEffect } from "react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader } from "../card";
import { ScrollArea } from "../scroll-area";
import { BrainCircuit } from "lucide-react";
import { toast } from "sonner";

interface StepProps {
  onPrevious: () => void;
  isFirstStep: boolean;
}

interface Step3Props extends StepProps {
  onPaymentStart?: () => void;
  onPaymentEnd?: () => void;
}

interface ProductResponse {
  id: number;
  name: string;
  price: string;
  description: string;
  attributes: {
    supportChannels?: string[];
    responseSLA?: string;
    knowledgeBaseAccess?: boolean;
    technicalConsultation?: string;
    proactiveMonitoring?: boolean;
    dedicatedAccountManager?: boolean;
  };
}

// Mock support products data
const mockSupportProducts: ProductResponse[] = [
  {
    id: 1,
    name: "Basic Support",
    price: "$29/month",
    description: "Essential support for small teams",
    attributes: {
      supportChannels: ["Email"],
      responseSLA: "48 hours",
      knowledgeBaseAccess: true,
      technicalConsultation: "Email only",
      proactiveMonitoring: false,
      dedicatedAccountManager: false
    }
  },
  {
    id: 2,
    name: "Standard Support",
    price: "$79/month",
    description: "Comprehensive support for growing businesses",
    attributes: {
      supportChannels: ["Email", "Chat"],
      responseSLA: "24 hours",
      knowledgeBaseAccess: true,
      technicalConsultation: "Email & Chat",
      proactiveMonitoring: true,
      dedicatedAccountManager: false
    }
  },
  {
    id: 3,
    name: "Premium Support",
    price: "$149/month",
    description: "Priority support with dedicated assistance",
    attributes: {
      supportChannels: ["Email", "Chat", "Phone"],
      responseSLA: "8 hours",
      knowledgeBaseAccess: true,
      technicalConsultation: "All channels",
      proactiveMonitoring: true,
      dedicatedAccountManager: true
    }
  },
  {
    id: 4,
    name: "Enterprise Support",
    price: "$299/month",
    description: "Full-service support for large organizations",
    attributes: {
      supportChannels: ["Email", "Chat", "Phone", "Dedicated Line"],
      responseSLA: "2 hours",
      knowledgeBaseAccess: true,
      technicalConsultation: "24/7 availability",
      proactiveMonitoring: true,
      dedicatedAccountManager: true
    }
  }
];

export function Step3SupportSelection({ onPrevious, isFirstStep }: Step3Props) {
  const [supportProducts, setSupportProducts] = useState<ProductResponse[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Mock API fetch
  useEffect(() => {
    const fetchSupportProducts = async () => {
      try {
        setIsLoadingProducts(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setSupportProducts(mockSupportProducts);
        console.log("Mock: Support products loaded:", mockSupportProducts);
      } catch (error) {
        console.error("Mock: Failed to fetch support products:", error);
        toast.error("Failed to load support plans. Please try again.");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchSupportProducts();
  }, []);

  if (isLoadingProducts) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Loading support plans...</h3>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious} disabled={isFirstStep}>
            Previous
          </Button>
          <Button disabled className="invisible">
            Next
          </Button>
        </div>
      </div>
    );
  }

  if (supportProducts.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">No support plans available</h3>
          <p className="text-sm text-muted-foreground">
            Please contact support or try again later.
          </p>
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious} disabled={isFirstStep}>
            Previous
          </Button>
          <Button disabled className="invisible">
            Complete
          </Button>
        </div>
      </div>
    );
  }

  const handleSelectPlan = (product: ProductResponse) => {
    console.log(`Mock: Selected support plan: ${product.name}`);
    toast.success(`Selected ${product.name} support plan`);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          Choose a support plan that suits your needs
        </h3>
        <p className="text-xs text-muted-foreground">
          For custom support plans, contact us
        </p>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportProducts.map((product) => (
            <Card 
              key={product.id} 
              className="w-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleSelectPlan(product)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <span className="text-2xl font-semibold">{product.name}</span>
                  <span className="text-lg font-bold text-primary">
                    {product.price}
                  </span>
                </div>
                <CardDescription className="uppercase text-xs font-thin tracking-wide text-blue-500">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {product.attributes.supportChannels && (
                    <li className="flex items-center gap-2">
                      <BrainCircuit size={12} className="text-blue-500" />
                      Support: {product.attributes.supportChannels.join(", ")}
                    </li>
                  )}
                  {product.attributes.responseSLA && (
                    <li className="flex items-center gap-2">
                      <BrainCircuit size={12} className="text-blue-500" />
                      Response SLA: {product.attributes.responseSLA}
                    </li>
                  )}
                  {product.attributes.knowledgeBaseAccess && (
                    <li className="flex items-center gap-2">
                      <BrainCircuit size={12} className="text-blue-500" />
                      Knowledge Base Access
                    </li>
                  )}
                  {product.attributes.technicalConsultation && (
                    <li className="flex items-center gap-2">
                      <BrainCircuit size={12} className="text-blue-500" />
                      Technical Consultation: {product.attributes.technicalConsultation}
                    </li>
                  )}
                  {product.attributes.proactiveMonitoring && (
                    <li className="flex items-center gap-2">
                      <BrainCircuit size={12} className="text-blue-500" />
                      Proactive Monitoring
                    </li>
                  )}
                  {product.attributes.dedicatedAccountManager && (
                    <li className="flex items-center gap-2">
                      <BrainCircuit size={12} className="text-blue-500" />
                      Dedicated Account Manager
                    </li>
                  )}
                </ul>
                
                <Button 
                  className="w-full mt-4"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(product);
                  }}
                >
                  Select {product.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col py-6 space-y-2">
          <p className="text-sm">Can't seem to find the right support plan?</p>
          <p className="text-sm">
            We have custom support solutions that can be tailored to your needs.
          </p>
          <Button
            variant="secondary"
            className="w-full md:w-1/3"
            onClick={() => {
              console.log("Mock: Contact us clicked");
              toast.info("Contact form would open here");
            }}
          >
            Contact us
          </Button>
        </div>
      </ScrollArea>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious} disabled={isFirstStep}>
          Previous
        </Button>
        <Button disabled className="invisible">
          Complete
        </Button>
      </div>
    </div>
  );
}