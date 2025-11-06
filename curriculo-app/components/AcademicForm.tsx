import React, { useState, useEffect } from "react";
import { Alert, Pressable } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useColorScheme } from "nativewind";
import type { AcademicItem } from "@/components/AcademicCard"; // Importa o tipo

// 1. Importar Moti e ícones
import { MotiView, AnimatePresence } from "moti"; 
import { PlusCircle, Edit3, MinusCircle, GraduationCap } from "lucide-react-native";

// Tipo para os dados do formulário
export type AcademicFormData = {
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim: string; 
};

// Estado inicial
const initialFormState = {
  instituicao: "",
  curso: "",
  dataInicio: "",
  dataFim: "",
};

// Props
type AcademicFormProps = {
  isLoading: boolean;
  onSubmit: (formData: AcademicFormData) => Promise<boolean>;
  initialData?: AcademicItem | null;
  onCancel?: () => void;
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

  const isEditMode = !!initialData;
  const [formState, setFormState] = useState(initialFormState);

  // 2. Estado interno para controlar se o acordeão está aberto
  const [isOpen, setIsOpen] = useState(isEditMode); 

  // Efeito para preencher o formulário E ABRIR
  useEffect(() => {
    if (initialData) {
      setFormState({
        instituicao: initialData.instituicao,
        curso: initialData.curso,
        dataInicio: initialData.dataInicio,
        dataFim: initialData.dataFim || "", 
      });
      setIsOpen(true); // Abre o formulário ao entrar no modo de edição
    } else {
      setFormState(initialFormState);
      setIsOpen(false); // Fecha ao sair do modo de edição (via 'onCancel')
    }
  }, [initialData]);

  const handleFormChange = (key: keyof AcademicFormData, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const internalHandleSubmit = async () => {
    if (!formState.instituicao || !formState.curso || !formState.dataInicio) {
      Alert.alert("Erro", "Preencha Instituição, Curso e Data Início.");
      return;
    }

    const success = await onSubmit(formState);
    if (!isEditMode && success) {
      setFormState(initialFormState);
      setIsOpen(false); // Fecha o formulário após criar com sucesso
    }
  };

  // Função de Cancelar atualizada
  const internalOnCancel = () => {
    if (onCancel) { // Modo de edição
      onCancel();
    } else { // Modo de adição
      setIsOpen(false);
    }
  };

  return (
    <Card className="w-full mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      
      {/* 3. CABEÇALHO CLICÁVEL (O Gatilho) */}
      <Pressable 
        onPress={() => {
          if (!isEditMode) {
            setIsOpen((prev) => !prev);
          }
        }}
        className="p-4"
      >
        <HStack className="items-center justify-between">
          <HStack className="items-center">
            <Icon
              as={isEditMode ? Edit3 : (isOpen ? MinusCircle : PlusCircle)} // Ícone dinâmico
              size="md"
              color={iconColor}
              className="mr-2.5"
            />
            <Heading className="text-lg font-semibold text-black dark:text-white">
              {isEditMode ? "Editar Formação" : "Adicionar Formação"}
            </Heading>
          </HStack>
        </HStack>
      </Pressable>

      {/* 4. CONTEÚDO ANIMADO */}
      <AnimatePresence>
        {isOpen && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 240 }} // Altura para 4 inputs + 1 botão
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "timing", duration: 300 }}
            style={{ overflow: 'hidden' }}
          >
            <VStack space="md" className="p-4 pt-0">
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

              <HStack space="md">
                {(isEditMode) && ( 
                  <Button
                    variant="outline"
                    action="secondary"
                    onPress={internalOnCancel}
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
          </MotiView>
        )}
      </AnimatePresence>
    </Card>
  );
}