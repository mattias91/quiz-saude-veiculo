"use client"

import { useState, useEffect } from "react"
import { Car, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Search, Wrench, AlertTriangle, TrendingUp, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

type QuizData = {
  // Informações Pessoais
  nome: string
  email: string
  whatsapp: string
  genero: string
  
  // Informações do Veículo
  tipoVeiculo: string
  marca: string
  modelo: string
  ano: string
  quilometragem: string
  combustivel: string
  tipoOleo: string
  
  // Uso do Veículo
  frequenciaUso: string
  principalUso: string[]
  
  // Necessidades de Manutenção
  manutencoesRealizadas: string[]
  frequenciaLembrete: string
  servicosImportantes: string[]
  
  // Desafio da Troca de Óleo
  kmTrocaOleo: string
  passouKmIdeal: string
  frequenciaAtraso: string
  
  // Histórico de Manutenção
  temHistorico: string
  ultimaManutencao: string
  
  // Preferências de Manutenção
  preferenciaOficina: string
  preocupacoes: string[]
  
  // Avaliação do Veículo
  estadoGeral: string
  temProblema: string
  descricaoProblema: string
  
  // Tecnologia e Recursos
  sistemaMonitoramento: string
  querDicasPersonalizadas: string
  
  // Localização
  pais: string
  estado: string
  bairro: string
  
  // Feedback
  feedbackAdicional: string
}

// Dados de países com bandeiras
const paises = [
  { value: "brasil", label: "Brasil", flag: "🇧🇷" },
  { value: "argentina", label: "Argentina", flag: "🇦🇷" },
  { value: "chile", label: "Chile", flag: "🇨🇱" },
  { value: "colombia", label: "Colômbia", flag: "🇨🇴" },
  { value: "mexico", label: "México", flag: "🇲🇽" },
  { value: "peru", label: "Peru", flag: "🇵🇪" },
  { value: "uruguai", label: "Uruguai", flag: "🇺🇾" },
  { value: "paraguai", label: "Paraguai", flag: "🇵🇾" },
  { value: "portugal", label: "Portugal", flag: "🇵🇹" },
  { value: "eua", label: "Estados Unidos", flag: "🇺🇸" },
]

// Estados do Brasil
const estadosBrasil = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
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
  const [showDashboard, setShowDashboard] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanMessage, setScanMessage] = useState("")
  const [vehicleId, setVehicleId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

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

  // Salvar dados no Supabase
  const saveToSupabase = async () => {
    setIsSaving(true)
    try {
      const { data, error } = await supabase
        .from('quiz_vehicles')
        .insert([
          {
            nome: quizData.nome,
            email: quizData.email,
            whatsapp: quizData.whatsapp,
            genero: quizData.genero,
            tipo_veiculo: quizData.tipoVeiculo,
            marca: quizData.marca,
            modelo: quizData.modelo,
            ano: quizData.ano,
            quilometragem: quizData.quilometragem,
            combustivel: quizData.combustivel,
            tipo_oleo: quizData.tipoOleo,
            frequencia_uso: quizData.frequenciaUso,
            principal_uso: quizData.principalUso,
            manutencoes_realizadas: quizData.manutencoesRealizadas,
            frequencia_lembrete: quizData.frequenciaLembrete,
            servicos_importantes: quizData.servicosImportantes,
            km_troca_oleo: quizData.kmTrocaOleo,
            passou_km_ideal: quizData.passouKmIdeal,
            frequencia_atraso: quizData.frequenciaAtraso,
            tem_historico: quizData.temHistorico,
            ultima_manutencao: quizData.ultimaManutencao,
            preferencia_oficina: quizData.preferenciaOficina,
            preocupacoes: quizData.preocupacoes,
            estado_geral: quizData.estadoGeral,
            tem_problema: quizData.temProblema,
            descricao_problema: quizData.descricaoProblema,
            sistema_monitoramento: quizData.sistemaMonitoramento,
            quer_dicas_personalizadas: quizData.querDicasPersonalizadas,
            pais: quizData.pais,
            estado: quizData.estado,
            bairro: quizData.bairro,
            feedback_adicional: quizData.feedbackAdicional,
            health_score: 75
          }
        ])
        .select()

      if (error) {
        console.error('Erro ao salvar:', error)
        toast.error('Erro ao salvar dados. Verifique sua conexão com o Supabase.')
        return false
      }

      if (data && data.length > 0) {
        setVehicleId(data[0].id)
        toast.success('Dados salvos com sucesso!')
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast.error('Erro ao salvar dados.')
      return false
    } finally {
      setIsSaving(false)
    }
  }

  const startScanning = async () => {
    setIsScanning(true)
    setScanProgress(0)
    
    const messages = [
      "Iniciando análise do veículo...",
      "Verificando dados do motor...",
      "Analisando histórico de manutenção...",
      "Calculando score de saúde...",
      "Processando recomendações personalizadas...",
      "Salvando dados no banco...",
      "Gerando relatório completo...",
      "Finalizando análise..."
    ]
    
    let messageIndex = 0
    let progressValue = 0
    
    const interval = setInterval(() => {
      progressValue += 2
      setScanProgress(progressValue)
      
      if (progressValue % 15 === 0 && messageIndex < messages.length) {
        setScanMessage(messages[messageIndex])
        messageIndex++
      }
      
      if (progressValue >= 100) {
        clearInterval(interval)
        setTimeout(async () => {
          const saved = await saveToSupabase()
          setIsScanning(false)
          if (saved) {
            setShowResults(true)
          }
        }, 500)
      }
    }, 50)
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      startScanning()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  // Tela de Scanning
  if (isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <Card className="border-2 border-slate-700 shadow-2xl bg-slate-800/50 backdrop-blur">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <Car className="w-24 h-24 text-slate-400 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-4 border-slate-600 border-t-slate-400 rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-slate-100">Analisando seu veículo...</h2>
                  <p className="text-slate-400 text-lg">{scanMessage}</p>
                </div>
                
                <div className="space-y-2">
                  <Progress value={scanProgress} className="h-3" />
                  <p className="text-slate-500 text-sm">{scanProgress}% completo</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <Search className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Escaneando</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <Wrench className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Analisando</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <Sparkles className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Processando</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Dashboard de Manutenção Inteligente
  if (showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header do Dashboard */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Manutenções Inteligentes</h1>
            <p className="text-slate-400 text-lg">Sistema de busca e análise personalizada para {quizData.marca} {quizData.modelo}</p>
          </div>

          {/* Cards de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card 1: Resumo do Veículo */}
            <Card className="bg-slate-800/50 backdrop-blur border-2 border-slate-700 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Car className="w-5 h-5 text-slate-400" />
                  Resumo do Veículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tipo:</span>
                    <span className="text-slate-200 font-semibold">{quizData.tipoVeiculo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Modelo:</span>
                    <span className="text-slate-200 font-semibold">{quizData.marca} {quizData.modelo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ano:</span>
                    <span className="text-slate-200 font-semibold">{quizData.ano}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">KM Atual:</span>
                    <span className="text-slate-200 font-semibold">{quizData.quilometragem} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estado:</span>
                    <span className={`font-semibold ${
                      quizData.estadoGeral === 'excelente' ? 'text-green-400' :
                      quizData.estadoGeral === 'bom' ? 'text-blue-400' :
                      quizData.estadoGeral === 'regular' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {quizData.estadoGeral.charAt(0).toUpperCase() + quizData.estadoGeral.slice(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Próxima Manutenção */}
            <Card className="bg-slate-800/50 backdrop-blur border-2 border-slate-700 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-400" />
                  Próxima Manutenção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-400 font-semibold text-sm mb-1">Troca de Óleo {quizData.tipoOleo}</p>
                    <p className="text-slate-300 text-xs">Recomendado em: {parseInt(quizData.quilometragem) + 5000} km</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <p className="text-slate-300 font-semibold text-sm mb-1">Verificação de Freios</p>
                    <p className="text-slate-400 text-xs">Próxima revisão: 3 meses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Alertas */}
            <Card className="bg-slate-800/50 backdrop-blur border-2 border-slate-700 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizData.temProblema === 'sim' ? (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <p className="text-red-400 font-semibold text-sm mb-1">Problema Detectado</p>
                      <p className="text-slate-300 text-xs">{quizData.descricaoProblema.substring(0, 50)}...</p>
                    </div>
                  ) : (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                      <p className="text-green-400 font-semibold text-sm mb-1">Tudo OK!</p>
                      <p className="text-slate-300 text-xs">Nenhum problema reportado</p>
                    </div>
                  )}
                  {quizData.passouKmIdeal === 'sim' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <p className="text-yellow-400 font-semibold text-sm mb-1">Atenção</p>
                      <p className="text-slate-300 text-xs">KM ideal para troca de óleo ultrapassado</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Score de Saúde */}
            <Card className="bg-slate-800/50 backdrop-blur border-2 border-slate-700 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Score de Saúde
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.75)}`}
                        className="text-green-400"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-slate-100">75%</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mt-3">Saúde Geral</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendações de Manutenção */}
          <Card className="bg-slate-800/50 backdrop-blur border-2 border-slate-700 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2 text-2xl">
                <Search className="w-6 h-6 text-slate-400" />
                Recomendações Personalizadas do Fabricante
              </CardTitle>
              <CardDescription className="text-slate-400">
                Baseado nas especificações do {quizData.marca} {quizData.modelo} {quizData.ano}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Manutenções Preventivas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Manutenções Preventivas
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-100">Troca de Óleo {quizData.tipoOleo} e Filtro</h4>
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Urgente</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Recomendação do fabricante: a cada 5.000 km ou 6 meses</p>
                      <p className="text-xs text-slate-500">Próxima troca: {parseInt(quizData.quilometragem) + 5000} km</p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-100">Verificação de Freios</h4>
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Normal</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Inspeção visual e medição de pastilhas</p>
                      <p className="text-xs text-slate-500">Recomendado: a cada 10.000 km</p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4 border-l-4 border-yellow-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-100">Alinhamento e Balanceamento</h4>
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Atenção</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Verificar desgaste irregular dos pneus</p>
                      <p className="text-xs text-slate-500">Recomendado: a cada 10.000 km ou quando necessário</p>
                    </div>
                  </div>
                </div>

                {/* Serviços Adicionais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Serviços Sugeridos
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-100 mb-2">Revisão do Sistema de Arrefecimento</h4>
                      <p className="text-sm text-slate-400 mb-2">Verificar nível e qualidade do líquido de arrefecimento</p>
                      <p className="text-xs text-slate-500">Frequência: Anual ou a cada 20.000 km</p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-100 mb-2">Troca de Filtro de Ar</h4>
                      <p className="text-sm text-slate-400 mb-2">Melhora desempenho e economia de combustível</p>
                      <p className="text-xs text-slate-500">Frequência: A cada 15.000 km</p>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-100 mb-2">Verificação de Bateria</h4>
                      <p className="text-sm text-slate-400 mb-2">Teste de carga e limpeza de terminais</p>
                      <p className="text-xs text-slate-500">Frequência: A cada 6 meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico e Análise */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Histórico de Manutenção */}
            <Card className="bg-slate-800/50 backdrop-blur border-2 border-slate-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-100 text-xl">Histórico de Manutenção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizData.manutencoesRealizadas.length > 0 ? (
                    quizData.manutencoesRealizadas.map((manutencao, index) => (
                      <div key={index} className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-slate-200 font-medium">{manutencao}</p>
                          <p className="text-xs text-slate-500">Últimos 12 meses</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center py-8">Nenhuma manutenção registrada nos últimos 12 meses</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Análise de Uso */}
            <Card className="bg-slate-800/50 backdrop-blur border-2 border-slate-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-100 text-xl">Análise de Uso do Veículo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400 text-sm">Frequência de Uso</span>
                      <span className="text-slate-200 font-semibold text-sm">{quizData.frequenciaUso}</span>
                    </div>
                    <Progress value={
                      quizData.frequenciaUso === 'diariamente' ? 100 :
                      quizData.frequenciaUso === 'semanalmente' ? 70 :
                      quizData.frequenciaUso === 'mensalmente' ? 40 : 20
                    } className="h-2" />
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-slate-200 font-semibold mb-3">Principal Uso</h4>
                    <div className="space-y-2">
                      {quizData.principalUso.map((uso, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{uso}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-slate-200 font-semibold mb-2">Preocupações Principais</h4>
                    <div className="flex flex-wrap gap-2">
                      {quizData.preocupacoes.map((preocupacao, index) => (
                        <span key={index} className="bg-slate-600/50 text-slate-300 text-xs px-3 py-1 rounded-full">
                          {preocupacao}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Botão de Voltar */}
          <div className="text-center">
            <Button
              onClick={() => setShowDashboard(false)}
              variant="outline"
              className="bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600"
            >
              Voltar aos Resultados
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-slate-700 shadow-2xl bg-slate-800/50 backdrop-blur">
            <CardHeader className="text-center bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="w-20 h-20" />
              </div>
              <CardTitle className="text-3xl font-bold mb-2">Parabéns, {quizData.nome}!</CardTitle>
              <CardDescription className="text-slate-200 text-lg">
                Você completou o Desafio da Saúde do Veículo!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-slate-500">
                <h3 className="font-bold text-xl mb-3 text-slate-100">Resumo do Seu Veículo</h3>
                <div className="space-y-2 text-slate-300">
                  <p><strong>Tipo:</strong> {quizData.tipoVeiculo}</p>
                  <p><strong>Veículo:</strong> {quizData.marca} {quizData.modelo} ({quizData.ano})</p>
                  <p><strong>Quilometragem:</strong> {quizData.quilometragem} km</p>
                  <p><strong>Estado Geral:</strong> {quizData.estadoGeral}</p>
                  <p><strong>Combustível:</strong> {quizData.combustivel}</p>
                  <p><strong>Tipo de Óleo:</strong> {quizData.tipoOleo}</p>
                </div>
              </div>

              <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-slate-400">
                <h3 className="font-bold text-xl mb-3 text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Próximos Passos
                </h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>Seus dados foram salvos com sucesso no banco de dados!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>Enviaremos um relatório completo para <strong>{quizData.email}</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>Você receberá lembretes de manutenção {quizData.frequenciaLembrete}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>Dicas personalizadas baseadas no seu perfil de uso</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-8 rounded-lg text-white text-center">
                <div className="flex justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-2xl mb-3">Acompanhamento Personalizado</h3>
                <p className="mb-6 text-slate-200 text-lg">
                  Gostaria de ter um acompanhamento personalizado da saúde do seu veículo e receber dicas contínuas?
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button 
                    size="lg" 
                    className="w-full bg-white text-slate-800 hover:bg-slate-100 font-bold text-lg shadow-lg"
                    onClick={() => setShowDashboard(true)}
                  >
                    Sim, quero!
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-lg"
                  >
                    Não
                  </Button>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600"
                onClick={() => {
                  setShowResults(false)
                  setCurrentStep(0)
                  setVehicleId(null)
                  setQuizData({
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {currentStep === 0 ? (
          <Card className="mb-8 border-2 border-slate-700 shadow-xl bg-slate-800/50 backdrop-blur">
            <CardHeader className="text-center bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-t-lg">
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16" />
              </div>
              <CardTitle className="text-4xl font-bold mb-2">Desafio da Saúde do Veículo!</CardTitle>
              <CardDescription className="text-slate-200 text-lg">
                Você está prestes a embarcar em uma jornada emocionante para descobrir a saúde do seu veículo!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4 text-center">
                <p className="text-lg text-slate-300">
                  Este quiz não é apenas uma série de perguntas – é a chave para entender como manter seu carro em ótimo estado e garantir que ele esteja sempre pronto para a próxima aventura!
                </p>
                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-3 text-slate-100">O que você ganha?</h3>
                  <ul className="space-y-2 text-left text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>Panorama exclusivo sobre a saúde do seu veículo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>Dicas personalizadas de manutenção</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>Surpresas e recomendações especiais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span>Dados salvos automaticamente no banco de dados</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  size="lg" 
                  onClick={nextStep}
                  className="bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white font-bold text-lg px-8 shadow-lg"
                >
                  Começar o Desafio
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-400">
                  Etapa {currentStep} de {totalSteps - 1}
                </span>
                <span className="text-sm font-medium text-slate-400">
                  {Math.round(progress)}% completo
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Quiz Card */}
            <Card className="shadow-xl border-2 border-slate-700 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-8">
                {/* Step 1: Informações Pessoais */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Informações Pessoais</h2>
                      <p className="text-slate-400">Vamos começar conhecendo você!</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome" className="text-slate-300">Qual é o seu nome?</Label>
                        <Input
                          id="nome"
                          value={quizData.nome}
                          onChange={(e) => updateField("nome", e.target.value)}
                          placeholder="Digite seu nome completo"
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-slate-300">E-mail (para que possamos enviar suas dicas especiais!)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={quizData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="seu@email.com"
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="whatsapp" className="text-slate-300">Número Principal de WhatsApp</Label>
                        <Input
                          id="whatsapp"
                          value={quizData.whatsapp}
                          onChange={(e) => updateField("whatsapp", e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-300">Qual é o seu gênero?</Label>
                        <RadioGroup value={quizData.genero} onValueChange={(value) => updateField("genero", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="masculino" id="masculino" />
                            <Label htmlFor="masculino" className="font-normal cursor-pointer text-slate-300">Masculino</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feminino" id="feminino" />
                            <Label htmlFor="feminino" className="font-normal cursor-pointer text-slate-300">Feminino</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outros" id="outros" />
                            <Label htmlFor="outros" className="font-normal cursor-pointer text-slate-300">Outros</Label>
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
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Informações do Veículo</h2>
                      <p className="text-slate-400">Conte-nos sobre o seu fiel escudeiro!</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tipoVeiculo" className="text-slate-300">Qual tipo de veículo você possui?</Label>
                        <Select value={quizData.tipoVeiculo} onValueChange={(value) => updateField("tipoVeiculo", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="carro">Carro</SelectItem>
                            <SelectItem value="moto">Moto</SelectItem>
                            <SelectItem value="caminhao">Caminhão</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="pickup">Pickup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="marca" className="text-slate-300">Qual é a marca do seu fiel escudeiro?</Label>
                        <Select value={quizData.marca} onValueChange={(value) => updateField("marca", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione a marca" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="chevrolet">Chevrolet</SelectItem>
                            <SelectItem value="fiat">Fiat</SelectItem>
                            <SelectItem value="ford">Ford</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="hyundai">Hyundai</SelectItem>
                            <SelectItem value="nissan">Nissan</SelectItem>
                            <SelectItem value="renault">Renault</SelectItem>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="volkswagen">Volkswagen</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="modelo" className="text-slate-300">Modelo do veículo (o seu carro dos sonhos!)</Label>
                        <Input
                          id="modelo"
                          value={quizData.modelo}
                          onChange={(e) => updateField("modelo", e.target.value)}
                          placeholder="Ex: Civic, Onix, Corolla..."
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ano" className="text-slate-300">Ano do veículo (quando ele chegou ao mundo)</Label>
                        <Select value={quizData.ano} onValueChange={(value) => updateField("ano", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione o ano" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="quilometragem" className="text-slate-300">Qual é a quilometragem atual?</Label>
                        <Input
                          id="quilometragem"
                          value={quizData.quilometragem}
                          onChange={(e) => updateField("quilometragem", e.target.value)}
                          placeholder="Ex: 50000"
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="combustivel" className="text-slate-300">Tipo de combustível (como o seu carro gosta de se alimentar?)</Label>
                        <Select value={quizData.combustivel} onValueChange={(value) => updateField("combustivel", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione o combustível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gasolina">Gasolina</SelectItem>
                            <SelectItem value="etanol">Etanol</SelectItem>
                            <SelectItem value="flex">Flex (Gasolina/Etanol)</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="eletrico">Elétrico</SelectItem>
                            <SelectItem value="hibrido">Híbrido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tipoOleo" className="text-slate-300">Que tipo de óleo você costuma usar?</Label>
                        <Select value={quizData.tipoOleo} onValueChange={(value) => updateField("tipoOleo", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione o tipo de óleo" />
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
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Uso do Veículo</h2>
                      <p className="text-slate-400">Como você utiliza seu veículo no dia a dia?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300 mb-3 block">Com que frequência você usa seu carro?</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { value: "diariamente", label: "Diariamente" },
                            { value: "semanalmente", label: "Semanalmente" },
                            { value: "mensalmente", label: "Mensalmente" },
                            { value: "raramente", label: "Raramente" }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => updateField("frequenciaUso", option.value)}
                              className={`relative flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                                quizData.frequenciaUso === option.value
                                  ? 'border-green-500 bg-green-500/10'
                                  : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                              }`}
                            >
                              <span className={`font-medium ${
                                quizData.frequenciaUso === option.value
                                  ? 'text-green-400'
                                  : 'text-slate-300'
                              }`}>
                                {option.label}
                              </span>
                              {quizData.frequenciaUso === option.value && (
                                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-slate-300">Qual é a principal aventura que você faz com seu veículo?</Label>
                        <div className="mt-2 space-y-2">
                          {["Transporte para trabalho", "Lazer", "Viagens longas", "Entregas/Trabalho", "Outros"].map((uso) => (
                            <div key={uso} className="flex items-center space-x-2">
                              <Checkbox
                                id={uso}
                                checked={quizData.principalUso.includes(uso)}
                                onCheckedChange={() => toggleArrayField("principalUso", uso)}
                              />
                              <Label htmlFor={uso} className="font-normal cursor-pointer text-slate-300">{uso}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Necessidades de Manutenção */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Necessidades de Manutenção</h2>
                      <p className="text-slate-400">Vamos entender suas necessidades de manutenção</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Quais manutenções você realizou nos últimos 12 meses?</Label>
                        <div className="mt-2 space-y-2">
                          {["Troca de óleo", "Troca de pneus", "Verificação de freios", "Alinhamento e balanceamento", "Revisão completa", "Troca de filtros", "Nenhuma"].map((manutencao) => (
                            <div key={manutencao} className="flex items-center space-x-2">
                              <Checkbox
                                id={manutencao}
                                checked={quizData.manutencoesRealizadas.includes(manutencao)}
                                onCheckedChange={() => toggleArrayField("manutencoesRealizadas", manutencao)}
                              />
                              <Label htmlFor={manutencao} className="font-normal cursor-pointer text-slate-300">{manutencao}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="frequenciaLembrete" className="text-slate-300">Com que frequência você quer ser lembrado sobre as manutenções?</Label>
                        <Select value={quizData.frequenciaLembrete} onValueChange={(value) => updateField("frequenciaLembrete", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="semanal">Semanal</SelectItem>
                            <SelectItem value="mensal">Mensal</SelectItem>
                            <SelectItem value="trimestral">A cada 3 meses</SelectItem>
                            <SelectItem value="semestral">A cada 6 meses</SelectItem>
                            <SelectItem value="anual">Anualmente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-slate-300">Quais serviços são mais importantes para você?</Label>
                        <div className="mt-2 space-y-2">
                          {["Troca de óleo", "Verificação de freios", "Alinhamento", "Balanceamento", "Troca de pneus", "Revisão elétrica", "Ar condicionado"].map((servico) => (
                            <div key={servico} className="flex items-center space-x-2">
                              <Checkbox
                                id={servico}
                                checked={quizData.servicosImportantes.includes(servico)}
                                onCheckedChange={() => toggleArrayField("servicosImportantes", servico)}
                              />
                              <Label htmlFor={servico} className="font-normal cursor-pointer text-slate-300">{servico}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Desafio da Troca de Óleo */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Desafio da Troca de Óleo</h2>
                      <p className="text-slate-400">Vamos falar sobre a troca de óleo do seu motor</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="kmTrocaOleo" className="text-slate-300">Quantos quilômetros você acha que seu motor precisa para uma troca de óleo perfeita?</Label>
                        <Input
                          id="kmTrocaOleo"
                          value={quizData.kmTrocaOleo}
                          onChange={(e) => updateField("kmTrocaOleo", e.target.value)}
                          placeholder="Ex: 5000, 10000..."
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                        />
                      </div>

                      <div>
                        <Label className="text-slate-300">Você já passou da quilometragem ideal para a troca de óleo?</Label>
                        <RadioGroup value={quizData.passouKmIdeal} onValueChange={(value) => updateField("passouKmIdeal", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="passou-sim" />
                            <Label htmlFor="passou-sim" className="font-normal cursor-pointer text-slate-300">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="passou-nao" />
                            <Label htmlFor="passou-nao" className="font-normal cursor-pointer text-slate-300">Não</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {quizData.passouKmIdeal === "sim" && (
                        <div>
                          <Label htmlFor="frequenciaAtraso" className="text-slate-300">Com que frequência você se aventura além da quilometragem?</Label>
                          <Input
                            id="frequenciaAtraso"
                            value={quizData.frequenciaAtraso}
                            onChange={(e) => updateField("frequenciaAtraso", e.target.value)}
                            placeholder="Ex: Sempre, às vezes, raramente..."
                            className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 6: Histórico de Manutenção */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Histórico de Manutenção</h2>
                      <p className="text-slate-400">Você mantém um registro das manutenções?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Você tem um diário de bordo das manutenções do seu carro?</Label>
                        <RadioGroup value={quizData.temHistorico} onValueChange={(value) => updateField("temHistorico", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="historico-sim" />
                            <Label htmlFor="historico-sim" className="font-normal cursor-pointer text-slate-300">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="historico-nao" />
                            <Label htmlFor="historico-nao" className="font-normal cursor-pointer text-slate-300">Não</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-slate-300 mb-2 block">Seu veículo passou por manutenção grave?</Label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => updateField("ultimaManutencao", "sim")}
                            className={`relative flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                              quizData.ultimaManutencao === "sim"
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                            }`}
                          >
                            <span className={`font-medium ${
                              quizData.ultimaManutencao === "sim"
                                ? 'text-green-400'
                                : 'text-slate-300'
                            }`}>
                              Sim
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => updateField("ultimaManutencao", "nao")}
                            className={`relative flex items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                              quizData.ultimaManutencao === "nao"
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                            }`}
                          >
                            <span className={`font-medium ${
                              quizData.ultimaManutencao === "nao"
                                ? 'text-green-400'
                                : 'text-slate-300'
                            }`}>
                              Não
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 7: Preferências de Manutenção */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Preferências de Manutenção</h2>
                      <p className="text-slate-400">Onde você prefere fazer a manutenção?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Você prefere confiar seu carro em uma oficina de sua escolha ou em uma concessionária oficial?</Label>
                        <RadioGroup value={quizData.preferenciaOficina} onValueChange={(value) => updateField("preferenciaOficina", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="oficinas" id="oficinas" />
                            <Label htmlFor="oficinas" className="font-normal cursor-pointer text-slate-300">Oficinas específicas</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="concessionarias" id="concessionarias" />
                            <Label htmlFor="concessionarias" className="font-normal cursor-pointer text-slate-300">Concessionárias</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="indiferente" id="indiferente" />
                            <Label htmlFor="indiferente" className="font-normal cursor-pointer text-slate-300">Indiferente</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-slate-300">O que mais te preocupa quando leva seu carro para manutenção?</Label>
                        <div className="mt-2 space-y-2">
                          {["Custo", "Qualidade do serviço", "Tempo de espera", "Confiança na oficina", "Garantia dos serviços", "Outros"].map((preocupacao) => (
                            <div key={preocupacao} className="flex items-center space-x-2">
                              <Checkbox
                                id={preocupacao}
                                checked={quizData.preocupacoes.includes(preocupacao)}
                                onCheckedChange={() => toggleArrayField("preocupacoes", preocupacao)}
                              />
                              <Label htmlFor={preocupacao} className="font-normal cursor-pointer text-slate-300">{preocupacao}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 8: Avaliação do Veículo */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Avaliação do Veículo</h2>
                      <p className="text-slate-400">Como está a saúde atual do seu veículo?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Como você avaliaria o estado geral do seu carro?</Label>
                        <RadioGroup value={quizData.estadoGeral} onValueChange={(value) => updateField("estadoGeral", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="excelente" id="excelente" />
                            <Label htmlFor="excelente" className="font-normal cursor-pointer text-slate-300">Excelente</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bom" id="bom" />
                            <Label htmlFor="bom" className="font-normal cursor-pointer text-slate-300">Bom</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="regular" id="regular" />
                            <Label htmlFor="regular" className="font-normal cursor-pointer text-slate-300">Regular</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ruim" id="ruim" />
                            <Label htmlFor="ruim" className="font-normal cursor-pointer text-slate-300">Ruim</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-slate-300">Você já percebeu algum problema estranho recentemente?</Label>
                        <RadioGroup value={quizData.temProblema} onValueChange={(value) => updateField("temProblema", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="problema-sim" />
                            <Label htmlFor="problema-sim" className="font-normal cursor-pointer text-slate-300">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="problema-nao" />
                            <Label htmlFor="problema-nao" className="font-normal cursor-pointer text-slate-300">Não</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {quizData.temProblema === "sim" && (
                        <div>
                          <Label htmlFor="descricaoProblema" className="text-slate-300">Descreva o mistério!</Label>
                          <Textarea
                            id="descricaoProblema"
                            value={quizData.descricaoProblema}
                            onChange={(e) => updateField("descricaoProblema", e.target.value)}
                            placeholder="Conte-nos sobre o problema que você percebeu..."
                            className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                            rows={4}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 9: Tecnologia e Recursos */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Tecnologia e Recursos do Veículo</h2>
                      <p className="text-slate-400">Seu carro tem recursos tecnológicos?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Seu carro possui algum sistema de monitoramento de manutenção?</Label>
                        <RadioGroup value={quizData.sistemaMonitoramento} onValueChange={(value) => updateField("sistemaMonitoramento", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="sistema-sim" />
                            <Label htmlFor="sistema-sim" className="font-normal cursor-pointer text-slate-300">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="sistema-nao" />
                            <Label htmlFor="sistema-nao" className="font-normal cursor-pointer text-slate-300">Não</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-slate-300">Você gostaria de receber dicas personalizadas com base nas tecnologias do seu carro?</Label>
                        <RadioGroup value={quizData.querDicasPersonalizadas} onValueChange={(value) => updateField("querDicasPersonalizadas", value)} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sim" id="dicas-sim" />
                            <Label htmlFor="dicas-sim" className="font-normal cursor-pointer text-slate-300">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nao" id="dicas-nao" />
                            <Label htmlFor="dicas-nao" className="font-normal cursor-pointer text-slate-300">Não</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 10: Localização */}
                {currentStep === 10 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Localização</h2>
                      <p className="text-slate-400">Onde você está localizado?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pais" className="text-slate-300">De qual país você é?</Label>
                        <Select value={quizData.pais} onValueChange={(value) => updateField("pais", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione o país" />
                          </SelectTrigger>
                          <SelectContent>
                            {paises.map((pais) => (
                              <SelectItem key={pais.value} value={pais.value}>
                                <span className="flex items-center gap-2">
                                  <span className="text-xl">{pais.flag}</span>
                                  <span>{pais.label}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="estado" className="text-slate-300">Qual estado você reside?</Label>
                        <Select value={quizData.estado} onValueChange={(value) => updateField("estado", value)}>
                          <SelectTrigger className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Selecione o estado" />
                          </SelectTrigger>
                          <SelectContent>
                            {estadosBrasil.map((estado) => (
                              <SelectItem key={estado} value={estado}>
                                {estado}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bairro" className="text-slate-300">Qual bairro você reside?</Label>
                        <Input
                          id="bairro"
                          value={quizData.bairro}
                          onChange={(e) => updateField("bairro", e.target.value)}
                          placeholder="Digite seu bairro"
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 11: Feedback e Sugestões */}
                {currentStep === 11 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-slate-100 mb-2">Feedback e Sugestões</h2>
                      <p className="text-slate-400">Última etapa! Compartilhe suas ideias</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="feedbackAdicional" className="text-slate-300">Qualquer outra aventura ou informação que você gostaria de compartilhar?</Label>
                        <Textarea
                          id="feedbackAdicional"
                          value={quizData.feedbackAdicional}
                          onChange={(e) => updateField("feedbackAdicional", e.target.value)}
                          placeholder="Compartilhe suas experiências, dúvidas ou sugestões..."
                          className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-500"
                          rows={6}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white flex items-center gap-2 shadow-lg"
                  >
                    {currentStep === 11 ? (isSaving ? "Salvando..." : "Finalizar Quiz") : "Próxima"}
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
