import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { PlusCircle, Edit3 } from "lucide-react-native"; // Adicionado Edit3
import { useColorScheme } from "nativewind";
import type { AcademicItem } from "@/components/AcademicCard"; // Importa o tipo

// 1. Tipo para os dados do formulário
export type AcademicFormData = {
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim: string; 
};

// 2. Estado inicial do formulário
const initialFormState: AcademicFormData = {
  instituicao: "",
  curso: "",
  dataInicio: "",
  dataFim: "",
};

// 3. Props atualizadas para Edição
type AcademicFormProps = {
  isLoading: boolean;
  onSubmit: (formData: AcademicFormData) => Promise<boolean>;
  initialData?: AcademicItem | null; // Dados para preencher o formulário
  onCancel?: () => void; // Função para cancelar a edição
};

export function AcademicForm({
  isLoading,
  onSubmit,
  initialData = null,
  onCancel,
}: AcademicFormProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  // 4. Lógica de Modo de Edição
  const isEditMode = !!initialData;
  const [formState, setFormState] = useState(initialFormState);

  // 5. Efeito para preencher o formulário quando 'initialData' mudar
  useEffect(() => {
    if (initialData) {
      setFormState({
        instituicao: initialData.instituicao,
        curso: initialData.curso,
        dataInicio: initialData.dataInicio,
        dataFim: initialData.dataFim || "", // Converte null para string vazia
      });
    } else {
      setFormState(initialFormState); // Limpa se não houver dados
    }
  }, [initialData]);

  // Helper para atualizar o formulário
  const handleFormChange = (key: keyof AcademicFormData, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // Função interna de submit
  const internalHandleSubmit = async () => {
    if (!formState.instituicao || !formState.curso || !formState.dataInicio) {
      Alert.alert("Erro", "Preencha Instituição, Curso e Data Início.");
      return;
    }
    
    // Chama a função 'onSubmit' (handleCreate ou handleUpdate)
    const success = await onSubmit(formState);

    // Se estiver em modo de 'Criação' e der certo, limpa o form
    if (!isEditMode && success) {
      setFormState(initialFormState);
    }
  };

  return (
    <Card className="w-full mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <HStack className="items-center mb-4">
        <Icon
          as={isEditMode ? Edit3 : PlusCircle} // Ícone dinâmico
          size="md"
          color={iconColor}
          className="mr-2.5"
        />
        <Heading className="text-lg font-semibold text-black dark:text-white">
          {/* 6. Título dinâmico */}
          {isEditMode ? "Editar Formação" : "Adicionar Nova Formação"}
        </Heading>
      </HStack>

      <VStack space="md">
        <Input>
          <InputField
            placeholder="Instituição (ex: UNICAP)"
            value={formState.instituicao}
            onChangeText={(v) => handleFormChange("instituicao", v)}
            className="text-black dark:text-white"
          />
        </Input>
        <Input>
          <InputField
            placeholder="Curso (ex: ADS)"
            value={formState.curso}
            onChangeText={(v) => handleFormChange("curso", v)}
            className="text-black dark:text-white"
          />
        </Input>
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
        
        {/* 7. Botões dinâmicos (Salvar/Cancelar ou Adicionar) */}
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