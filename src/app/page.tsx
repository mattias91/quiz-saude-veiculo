"use client"

import { useState } from "react"
import { Car, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

type QuizData = {
  nome: string
  email: string
  whatsapp: string
  genero: string
  tipoVeiculo: string
  marca: string
  modelo: string
  ano: string
  quilometragem: string
  combustivel: string
  tipoOleo: string
  frequenciaUso: string
  principalUso: string[]
  manutencoesRealizadas: string[]
  frequenciaLembrete: string
  servicosImportantes: string[]
  kmTrocaOleo: string
  passouKmIdeal: string
  frequenciaAtraso: string
  temHistorico: string
  ultimaManutencao: string
  preferenciaOficina: string
  preocupacoes: string[]
  estadoGeral: string
  temProblema: string
  descricaoProblema: string
  sistemaMonitoramento: string
  querDicasPersonalizadas: string
  pais: string
  estado: string
  bairro: string
  feedbackAdicional: string
}

const paises = [
  { value: "brasil", label: "Brasil", flag: "🇧🇷" },
  { value: "argentina", label: "Argentina", flag: "🇦🇷" },
  { value: "chile", label: "Chile", flag: "🇨🇱" },
  { value: "colombia", label: "Colômbia", flag: "🇨🇴" },
  { value: "mexico", label: "México", flag: "🇲🇽" },
]

const estadosBrasil = [
  "São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná",
  "Rio Grande do Sul", "Pernambuco", "Ceará", "Pará", "Santa Catarina"
]

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0)
  const [quizData, setQuizData] = useState<QuizData>({
    nome: "",
    email: "",
    whatsapp: "",
    genero: "",
    tipoVeiculo: "",
    marca: "",
    modelo: "",
    ano: "",
    quilometragem: "",
    combustivel: "",
    tipoOleo: "",
    frequenciaUso: "",
    principalUso: [],
    manutencoesRealizadas: [],
    frequenciaLembrete: "",
    servicosImportantes: [],
    kmTrocaOleo: "",
    passouKmIdeal: "",
    frequenciaAtraso: "",
    temHistorico: "",
    ultimaManutencao: "",
    preferenciaOficina: "",
    preocupacoes: [],
    estadoGeral: "",
    temProblema: "",
    descricaoProblema: "",
    sistemaMonitoramento: "",
    querDicasPersonalizadas: "",
    pais: "",
    estado: "",
    bairro: "",
    feedbackAdicional: "",
  })
  const [showResults, setShowResults] = useState(false)

  const totalSteps = 12
  const progress = ((currentStep + 1) / totalSteps) * 100

  const updateField = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayField = (field: keyof QuizData, value: string) => {
    setQuizData(prev => {
      const currentArray = prev[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!quizData.nome.trim()) {
          toast.error("Por favor, preencha seu nome")
          return false
        }
        if (!quizData.email.trim() || !quizData.email.includes("@")) {
          toast.error("Por favor, preencha um e-mail válido")
          return false
        }
        if (!quizData.whatsapp.trim()) {
          toast.error("Por favor, preencha seu WhatsApp")
          return false
        }
        if (!quizData.genero) {
          toast.error("Por favor, selecione seu gênero")
          return false
        }
        return true

      case 2:
        if (!quizData.tipoVeiculo || !quizData.marca || !quizData.modelo.trim() || 
            !quizData.ano || !quizData.quilometragem.trim() || !quizData.combustivel || !quizData.tipoOleo) {
          toast.error("Por favor, preencha todos os campos do veículo")
          return false
        }
        return true

      case 3:
        if (!quizData.frequenciaUso || quizData.principalUso.length === 0) {
          toast.error("Por favor, preencha todos os campos de uso")
          return false
        }
        return true

      default:
        return true
    }
  }

  const nextStep = () => {
    if (currentStep > 0 && currentStep < 11) {
      if (!validateStep(currentStep)) {
        return
      }
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setShowResults(true)
      toast.success("Quiz finalizado com sucesso!")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-purple-500 shadow-2xl bg-white/10 backdrop-blur-lg">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-20 h-20" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Parabéns, {quizData.nome}!</CardTitle>
              <CardDescription className="text-white text-lg">
                Você completou o Desafio da Saúde do Veículo!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6 text-white">
              <div className="bg-white/10 p-6 rounded-lg border-l-4 border-purple-400">
                <h3 className="font-bold text-xl mb-3">Resumo do Seu Veículo</h3>
                <div className="space-y-2">
                  <p><strong>Tipo:</strong> {quizData.tipoVeiculo}</p>
                  <p><strong>Veículo:</strong> {quizData.marca} {quizData.modelo} ({quizData.ano})</p>
                  <p><strong>Quilometragem:</strong> {quizData.quilometragem} km</p>
                  <p><strong>Estado Geral:</strong> {quizData.estadoGeral}</p>
                  <p><strong>Combustível:</strong> {quizData.combustivel}</p>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-lg border-l-4 border-pink-400">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Próximos Passos
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Seus dados foram salvos com sucesso!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Enviaremos um relatório completo para <strong>{quizData.email}</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Você receberá lembretes de manutenção {quizData.frequenciaLembrete}</span>
                  </li>
                </ul>
              </div>

              <Button 
                variant="outline" 
                className="w-full bg-white/20 text-white border-white/30 hover:bg-white/30"
                onClick={() => {
                  setShowResults(false)
                  setCurrentStep(0)
                  setQuizData({
                    nome: "", email: "", whatsapp: "", genero: "", tipoVeiculo: "",
                    marca: "", modelo: "", ano: "", quilometragem: "", combustivel: "",
                    tipoOleo: "", frequenciaUso: "", principalUso: [], manutencoesRealizadas: [],
                    frequenciaLembrete: "", servicosImportantes: [], kmTrocaOleo: "",
                    passouKmIdeal: "", frequenciaAtraso: "", temHistorico: "",
                    ultimaManutencao: "", preferenciaOficina: "", preocupacoes: [],
                    estadoGeral: "", temProblema: "", descricaoProblema: "",
                    sistemaMonitoramento: "", querDicasPersonalizadas: "",
                    pais: "", estado: "", bairro: "", feedbackAdicional: "",
                  })
                }}
              >
                Fazer novo quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {currentStep === 0 ? (
          <Card className="mb-8 border-2 border-purple-500 shadow-xl bg-white/10 backdrop-blur-lg">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16" />
              </div>
              <CardTitle className="text-4xl font-bold mb-2">Desafio da Saúde do Veículo!</CardTitle>
              <CardDescription className="text-white text-lg">
                Descubra a saúde do seu veículo em 12 etapas!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 text-white">
              <div className="space-y-4 text-center">
                <p className="text-lg">
                  Este quiz vai te ajudar a entender como manter seu carro em ótimo estado!
                </p>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3">O que você ganha?</h3>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Panorama exclusivo sobre a saúde do seu veículo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Dicas personalizadas de manutenção</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Recomendações especiais</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  size="lg" 
                  onClick={nextStep}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-lg px-8 shadow-lg"
                >
                  Começar o Desafio
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">
                  Etapa {currentStep} de {totalSteps - 1}
                </span>
                <span className="text-sm font-medium text-white">
                  {Math.round(progress)}% completo
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <Card className="shadow-xl border-2 border-purple-500 bg-white/10 backdrop-blur-lg">
              <CardContent className="p-8">
                {/* Step 1: Informações Pessoais */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">Informações Pessoais</h2>
                      <p className="text-purple-200">Vamos começar conhecendo você!</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome" className="text-white">Qual é o seu nome? *</Label>
                        <Input
                          id="nome"
                          value={quizData.nome}
                          onChange={(e) => updateField("nome", e.target.value)}
                          placeholder="Digite seu nome completo"
                          className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={quizData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="seu@email.com"
                          className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="whatsapp" className="text-white">WhatsApp *</Label>
                        <Input
                          id="whatsapp"
                          value={quizData.whatsapp}
                          onChange={(e) => updateField("whatsapp", e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Gênero *</Label>
                        <RadioGroup value={quizData.genero} onValueChange={(value) => updateField("genero", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="masculino" id="masculino" />
                            <Label htmlFor="masculino" className="font-normal cursor-pointer text-white">Masculino</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feminino" id="feminino" />
                            <Label htmlFor="feminino" className="font-normal cursor-pointer text-white">Feminino</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outros" id="outros" />
                            <Label htmlFor="outros" className="font-normal cursor-pointer text-white">Outros</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Informações do Veículo */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">Informações do Veículo</h2>
                      <p className="text-purple-200">Conte-nos sobre o seu veículo!</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tipoVeiculo" className="text-white">Tipo de veículo *</Label>
                        <Select value={quizData.tipoVeiculo} onValueChange={(value) => updateField("tipoVeiculo", value)}>
                          <SelectTrigger className="mt-1 bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="carro">Carro</SelectItem>
                            <SelectItem value="moto">Moto</SelectItem>
                            <SelectItem value="caminhao">Caminhão</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="marca" className="text-white">Marca *</Label>
                        <Select value={quizData.marca} onValueChange={(value) => updateField("marca", value)}>
                          <SelectTrigger className="mt-1 bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Selecione a marca" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chevrolet">Chevrolet</SelectItem>
                            <SelectItem value="fiat">Fiat</SelectItem>
                            <SelectItem value="ford">Ford</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="volkswagen">Volkswagen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="modelo" className="text-white">Modelo *</Label>
                        <Input
                          id="modelo"
                          value={quizData.modelo}
                          onChange={(e) => updateField("modelo", e.target.value)}
                          placeholder="Ex: Civic, Onix..."
                          className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ano" className="text-white">Ano *</Label>
                        <Select value={quizData.ano} onValueChange={(value) => updateField("ano", value)}>
                          <SelectTrigger className="mt-1 bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Selecione o ano" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 20 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="quilometragem" className="text-white">Quilometragem *</Label>
                        <Input
                          id="quilometragem"
                          value={quizData.quilometragem}
                          onChange={(e) => updateField("quilometragem", e.target.value)}
                          placeholder="Ex: 50000"
                          className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="combustivel" className="text-white">Combustível *</Label>
                        <Select value={quizData.combustivel} onValueChange={(value) => updateField("combustivel", value)}>
                          <SelectTrigger className="mt-1 bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gasolina">Gasolina</SelectItem>
                            <SelectItem value="etanol">Etanol</SelectItem>
                            <SelectItem value="flex">Flex</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tipoOleo" className="text-white">Tipo de óleo *</Label>
                        <Select value={quizData.tipoOleo} onValueChange={(value) => updateField("tipoOleo", value)}>
                          <SelectTrigger className="mt-1 bg-white/20 border-white/30 text-white">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sintetico">Sintético</SelectItem>
                            <SelectItem value="semisintetico">Semissintético</SelectItem>
                            <SelectItem value="mineral">Mineral</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Uso do Veículo */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">Uso do Veículo</h2>
                      <p className="text-purple-200">Como você utiliza seu veículo?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-white mb-3 block">Frequência de uso *</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {["diariamente", "semanalmente", "mensalmente", "raramente"].map((freq) => (
                            <button
                              key={freq}
                              type="button"
                              onClick={() => updateField("frequenciaUso", freq)}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                quizData.frequenciaUso === freq
                                  ? 'border-green-400 bg-green-400/20'
                                  : 'border-white/30 bg-white/10 hover:border-white/50'
                              }`}
                            >
                              <span className="font-medium text-white capitalize">{freq}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">Principal uso *</Label>
                        <div className="mt-2 space-y-2">
                          {["Trabalho", "Lazer", "Viagens", "Entregas"].map((uso) => (
                            <div key={uso} className="flex items-center space-x-2">
                              <Checkbox
                                id={uso}
                                checked={quizData.principalUso.includes(uso)}
                                onCheckedChange={() => toggleArrayField("principalUso", uso)}
                              />
                              <Label htmlFor={uso} className="font-normal cursor-pointer text-white">{uso}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Steps 4-11: Placeholder simplificado */}
                {currentStep >= 4 && currentStep <= 11 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-white mb-2">Etapa {currentStep}</h2>
                      <p className="text-purple-200">Continue preenchendo as informações</p>
                    </div>
                    <div className="bg-white/10 p-8 rounded-lg text-center">
                      <Car className="w-16 h-16 text-white mx-auto mb-4" />
                      <p className="text-white text-lg">
                        Esta é a etapa {currentStep}. Continue para finalizar o quiz!
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white flex items-center gap-2 shadow-lg"
                  >
                    {currentStep === 11 ? "Finalizar" : "Próxima"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
