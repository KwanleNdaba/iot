import { Button } from "../button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { Input } from "../input";
import { Progress } from "../progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface CreateOrganisationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: OrganisationFormData) => void;
  initialStep?: number;
}

interface OrganisationFormData {
  name: string;
}

interface ProductResponse {
  id: number;
  name: string;
  price: string;
  description: string;
  attributes: {
    userLimit?: number;
    supportChannels?: string[];
    responseSLA?: string;
    knowledgeBaseAccess?: boolean;
    proactiveMonitoring?: boolean;
    businessReviews?: boolean;
    onDemandTraining?: boolean;
    dedicatedAccountManager?: boolean;
  };
}

// Mock data - simplified platform products
const mockPlatformProducts: ProductResponse[] = [
  {
    id: 1,
    name: "Basic",
    price: "$99/month",
    description: "Perfect for small teams",
    attributes: {
      userLimit: 10,
      supportChannels: ["Email"],
      responseSLA: "48 hours",
      knowledgeBaseAccess: true,
      proactiveMonitoring: false,
      businessReviews: false,
      onDemandTraining: false,
      dedicatedAccountManager: false
    }
  },
  {
    id: 2,
    name: "Professional",
    price: "$199/month", 
    description: "Ideal for growing businesses",
    attributes: {
      userLimit: 25,
      supportChannels: ["Email", "Chat", "Phone"],
      responseSLA: "24 hours",
      knowledgeBaseAccess: true,
      proactiveMonitoring: true,
      businessReviews: false,
      onDemandTraining: false,
      dedicatedAccountManager: false
    }
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$399/month",
    description: "Full-featured solution",
    attributes: {
      userLimit: 100,
      supportChannels: ["Email", "Chat", "Phone", "Dedicated"],
      responseSLA: "4 hours",
      knowledgeBaseAccess: true,
      proactiveMonitoring: true,
      businessReviews: true,
      onDemandTraining: true,
      dedicatedAccountManager: true
    }
  }
];

const TOTAL_STEPS = 3;

const organisationNameSchema = z.object({
  name: z
    .string()
    .min(2, "Organisation name must be at least 2 characters")
    .max(100, "Organisation name must be less than 100 characters")
    .trim(),
});

type OrganisationNameFormData = z.infer<typeof organisationNameSchema>;

interface StepProps {
  data: OrganisationFormData;
  onDataChange: (data: Partial<OrganisationFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isValid: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
}

function Step1OrganisationName({
  data,
  onDataChange,
  onNext,
  isValid,
  isFirstStep,
}: StepProps) {
  const form = useForm<OrganisationNameFormData>({
    resolver: zodResolver(organisationNameSchema),
    defaultValues: { name: data.name },
  });

  const handleSubmit = async (formData: OrganisationNameFormData) => {
    onDataChange({ name: formData.name });

    try {
      // Mock organization creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Mock: Organization created successfully");
      toast.success(`Organization "${formData.name}" created successfully!`);
      onNext();
    } catch (error) {
      console.error("Mock: Failed to create organization:", error);
      toast.error("Failed to create organization. Please try again.");
    }
  };

  useEffect(() => {
    form.setValue("name", data.name);
  }, [data.name, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.name !== undefined) {
        onDataChange({ name: value.name });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisation Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter organisation name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isFirstStep}
              className="invisible"
            >
              Previous
            </Button>
            <Button type="submit" disabled={!isValid}>
              Create Organisation
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function Step2PaymentSelection({
  onNext,
  onPrevious,
  isFirstStep,
}: StepProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (product: ProductResponse) => {
    setIsProcessing(true);
    
    try {
      // Mock payment initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Mock: Payment initialized for ${product.name}`);
      toast.success(`Payment initialized for ${product.name} plan`);
      
      // Simulate successful payment and proceed to next step
      setTimeout(() => {
        setIsProcessing(false);
        onNext();
      }, 2000);
      
    } catch (error) {
      console.error("Mock: Failed to initialize payment:", error);
      toast.error(`Failed to initialize payment for ${product.name}. Please try again.`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Choose a plan that suits your needs</h3>
        <p className="text-xs text-muted-foreground">For custom plans, contact us</p>
      </div>

      <div className="w-[90%] mx-auto py-10">
        <div className="flex justify-between gap-6 items-start">
          {mockPlatformProducts.map((product) => {
            const isProfessional = product.name.toLowerCase() === "professional";
            return (
              <div
                key={product.id}
                className={`flex-1 rounded-lg p-6 relative transition-all duration-300 flex flex-col ${
                  isProfessional
                    ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-2xl scale-110 z-20 border border-primary/30 min-h-[600px]"
                    : "bg-card border border-border shadow-sm hover:shadow-md min-h-[550px] z-10"
                }`}
              >
                {isProfessional && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-bold shadow-xl z-30">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-xl font-semibold mb-2 ${isProfessional ? "text-primary-foreground" : "text-foreground"}`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isProfessional ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {product.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-3xl font-bold ${isProfessional ? "text-primary-foreground" : "text-foreground"}`}>
                      {product.price.replace(/\/month$/, "")}
                    </span>
                    <span className={`text-xs ${isProfessional ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      /month
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="space-y-3 mb-6">
                    {product.attributes.userLimit && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          {product.attributes.userLimit} Users
                        </span>
                      </div>
                    )}
                    {product.attributes.supportChannels && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          Support: {product.attributes.supportChannels.join(", ")}
                        </span>
                      </div>
                    )}
                    {product.attributes.responseSLA && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          Response SLA: {product.attributes.responseSLA}
                        </span>
                      </div>
                    )}
                    {product.attributes.knowledgeBaseAccess && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          Knowledge Base Access
                        </span>
                      </div>
                    )}
                    {product.attributes.proactiveMonitoring && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          Proactive Monitoring
                        </span>
                      </div>
                    )}
                    {product.attributes.businessReviews && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          Business Reviews
                        </span>
                      </div>
                    )}
                    {product.attributes.onDemandTraining && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          On-Demand Training
                        </span>
                      </div>
                    )}
                    {product.attributes.dedicatedAccountManager && (
                      <div className="flex items-center gap-3">
                        <Check className={`h-4 w-4 ${isProfessional ? "text-primary-foreground/80" : "text-green-500"}`} />
                        <span className={`text-sm ${isProfessional ? "text-primary-foreground/90" : "text-foreground"}`}>
                          Dedicated Account Manager
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => handlePayment(product)}
                  className={`w-full ${
                    isProfessional
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  disabled={isProcessing}
                >
                  Choose {product.name} Plan
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious} disabled={isFirstStep || isProcessing}>
          Previous
        </Button>
        <Button onClick={onNext} disabled={isProcessing} className="invisible">
          Next
        </Button>
      </div>
    </div>
  );
}

function Step3Completion({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-bold mb-4">Organization Setup Complete!</h2>
      <p className="mb-6">
        Your organization is now fully set up and active. You can now use all features.
      </p>
      <Button onClick={onNext}>Go to Dashboard</Button>
    </div>
  );
}

export function CreateOrganisationDialog({
  open,
  onOpenChange,
  onComplete,
  initialStep = 1,
}: CreateOrganisationDialogProps) {
  const [formData, setFormData] = useState<OrganisationFormData>({ name: "" });
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  useEffect(() => {
    if (open && initialStep > 1) {
      setCurrentStep(initialStep);
    }
  }, [open, initialStep]);

  const updateFormData = (newData: Partial<OrganisationFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && currentStep === 1) {
      setFormData({ name: "" });
      setCurrentStep(1);
    }
    onOpenChange(newOpen);
  };

  const isStep1Valid = useMemo(() => {
    const result = organisationNameSchema.safeParse({ name: formData.name });
    return result.success;
  }, [formData.name]);

  const getCurrentStepValidation = (): boolean => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: case 3: return true;
      default: return false;
    }
  };

  const renderCurrentStep = () => {
    const stepProps: StepProps = {
      data: formData,
      onDataChange: updateFormData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isValid: getCurrentStepValidation(),
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === TOTAL_STEPS,
    };

    switch (currentStep) {
      case 1: return <Step1OrganisationName {...stepProps} />;
      case 2: return <Step2PaymentSelection {...stepProps} />;
      case 3: return <Step3Completion {...stepProps} />;
      default: return null;
    }
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  return (
    <Dialog open={open && !isPaymentInProgress} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Organisation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {TOTAL_STEPS}</span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {renderCurrentStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}