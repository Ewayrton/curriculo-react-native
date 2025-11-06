import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea"; 
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { PlusCircle, Edit3 } from "lucide-react-native"; 
import { useColorScheme } from "nativewind";
import type { WorkExpItem } from "@/components/WorkExpCard";

// 1. Tipo para os dados do formulário
export type WorkExpFormData = {
  empresa: string;
  cargo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string; 
};

// 2. Estado inicial
const initialFormState: WorkExpFormData = {
  empresa: "",
  cargo: "",
  descricao: "",
  dataInicio: "",
  dataFim: "",
};

// 3. Props
type WorkExpFormProps = {
  isLoading: boolean;
  onSubmit: (formData: WorkExpFormData) => Promise<boolean>;
  initialData?: WorkExpItem | null; 
  onCancel?: () => void; 
};

export function WorkExpForm({
  isLoading,
  onSubmit,
  initialData = null,
  onCancel,
}: WorkExpFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  const isEditMode = !!initialData;
  const [formState, setFormState] = useState(initialFormState);

  // Efeito para preencher o formulário em modo de edição
  useEffect(() => {
    if (initialData) {
      setFormState({
        empresa: initialData.empresa,
        cargo: initialData.cargo,
        descricao: initialData.descricao || "", 
        dataInicio: initialData.dataInicio,
        dataFim: initialData.dataFim || "", 
      });
    } else {
      setFormState(initialFormState); 
    }
  }, [initialData]);

  const handleFormChange = (key: keyof WorkExpFormData, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const internalHandleSubmit = async () => {
    // 4. Validação atualizada
    if (!formState.empresa || !formState.cargo || !formState.dataInicio) {
      Alert.alert("Erro", "Preencha Empresa, Cargo e Data Início.");
      return;
    }
    
    const success = await onSubmit(formState);

    if (!isEditMode && success) {
      setFormState(initialFormState);
    }
  };

  return (
    <Card className="w-full mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <HStack className="items-center mb-4">
        <Icon
          as={isEditMode ? Edit3 : PlusCircle} 
          size="md"
          color={iconColor}
          className="mr-2.5"
        />
        <Heading className="text-lg font-semibold text-black dark:text-white">
          {isEditMode ? "Editar Experiência" : "Adicionar Experiência"}
        </Heading>
      </HStack>

      <VStack space="md">
        {/* 5. Campos do Formulário Atualizados */}
        <Input>
          <InputField
            placeholder="Empresa (ex: Google)"
            value={formState.empresa}
            onChangeText={(v) => handleFormChange("empresa", v)}
            className="text-black dark:text-white"
          />
        </Input>
        <Input>
          <InputField
            placeholder="Cargo (ex: Dev React Native Pleno)"
            value={formState.cargo}
            onChangeText={(v) => handleFormChange("cargo", v)}
            className="text-black dark:text-white"
          />
        </Input>
        <Textarea>
          <TextareaInput
            placeholder="Descrição (ex: Responsável por...)"
            value={formState.descricao}
            onChangeText={(v) => handleFormChange("descricao", v)}
            className="text-black dark:text-white"
          />
        </Textarea>
        <Input>
          <InputField
            placeholder="Data Início (YYYY-MM-DD)"
            value={formState.dataInicio}
            onChangeText={(v) => handleFormChange("dataInicio", v)}
            className="text-black dark:text-white"
          />
        </Input>
        <Input>
          <InputField
            placeholder="Data Fim (YYYY-MM-DD, ou deixe em branco)"
            value={formState.dataFim}
            onChangeText={(v) => handleFormChange("dataFim", v)}
            className="text-black dark:text-white"
          />
        </Input>
        
        <HStack space="md">
          {isEditMode && (
            <Button
              variant="outline"
              action="secondary"
              onPress={onCancel}
              className="flex-1"
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          )}
          <Button
            onPress={internalHandleSubmit}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <ButtonText>{isEditMode ? "Atualizar" : "Enviar"}</ButtonText>
            )}
          </Button>
        </HStack>
        
      </VStack>
    </Card>
  );
}