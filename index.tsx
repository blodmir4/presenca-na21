import { useState, useMemo } from "react";
import { Shield, Swords, ArrowUpDown, Search, Users, TrendingUp, Award, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface PlayerAttendance {
  name: string;
  overall: number;
  pvpServer: number;
  pveServer: number;
  pvpTorre: number;
  pvpCima: number;
  pvpQuadrado: number;
  warVale: number;
  defesaCristal: number;
  scoutAlly: number;
}

const attendanceData: PlayerAttendance[] = [
  { name: "Cl3opa", overall: 100, pvpServer: 80, pveServer: 100, pvpTorre: 0, pvpCima: 90, pvpQuadrado: 90, warVale: 100, defesaCristal: 0, scoutAlly: 0 },
  { name: "BumBumTamTam", overall: 100, pvpServer: 100, pveServer: 100, pvpTorre: 0, pvpCima: 100, pvpQuadrado: 100, warVale: 100, defesaCristal: 100, scoutAlly: 10 },
  { name: "メBloodCrossメ", overall: 100, pvpServer: 100, pveServer: 100, pvpTorre: 40, pvpCima: 100, pvpQuadrado: 100, warVale: 100, defesaCristal: 100, scoutAlly: 10 },
  { name: "ReyAlex", overall: 100, pvpServer: 100, pveServer: 80, pvpTorre: 50, pvpCima: 100, pvpQuadrado: 90, warVale: 100, defesaCristal: 0, scoutAlly: 0 },
  { name: "feluka", overall: 100, pvpServer: 100, pveServer: 100, pvpTorre: 0, pvpCima: 100, pvpQuadrado: 100, warVale: 100, defesaCristal: 0, scoutAlly: 0 },
  { name: "kevcito", overall: 100, pvpServer: 100, pveServer: 100, pvpTorre: 50, pvpCima: 100, pvpQuadrado: 100, warVale: 0, defesaCristal: 0, scoutAlly: 0 },
  { name: "Adonis 333", overall: 100, pvpServer: 100, pveServer: 100, pvpTorre: 0, pvpCima: 100, pvpQuadrado: 100, warVale: 100, defesaCristal: 100, scoutAlly: 0 },
  { name: "sayayin 12", overall: 100, pvpServer: 100, pveServer: 100, pvpTorre: 0, pvpCima: 100, pvpQuadrado: 100, warVale: 100, defesaCristal: 0, scoutAlly: 0 },
  { name: "RB LTDA", overall: 80, pvpServer: 80, pveServer: 80, pvpTorre: 0, pvpCima: 50, pvpQuadrado: 50, warVale: 100, defesaCristal: 0, scoutAlly: 0 },
  { name: "Alb4ph1c4", overall: 100, pvpServer: 100, pveServer: 100, pvpTorre: 0, pvpCima: 100, pvpQuadrado: 50, warVale: 100, defesaCristal: 100, scoutAlly: 0 },
  { name: "Chaos Sunny", overall: 70, pvpServer: 10, pveServer: 40, pvpTorre: 0, pvpCima: 10, pvpQuadrado: 0, warVale: 100, defesaCristal: 0, scoutAlly: 0 },
  { name: "ivanbulman19", overall: 80, pvpServer: 50, pveServer: 40, pvpTorre: 0, pvpCima: 100, pvpQuadrado: 50, warVale: 100, defesaCristal: 100, scoutAlly: 0 },
  { name: "ALEXBJ22", overall: 80, pvpServer: 80, pveServer: 50, pvpTorre: 0, pvpCima: 100, pvpQuadrado: 80, warVale: 100, defesaCristal: 100, scoutAlly: 0 },
];

const getAttendanceColor = (percentage: number) => {
  if (percentage >= 90) return "text-success";
  if (percentage >= 70) return "text-warning";
  return "text-destructive";
};

const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return "bg-success";
  if (percentage >= 70) return "bg-warning";
  return "bg-destructive";
};

type SortField = keyof PlayerAttendance;
type SortDirection = "asc" | "desc";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("overall");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = attendanceData.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      const numA = typeof aValue === 'number' ? aValue : 0;
      const numB = typeof bValue === 'number' ? bValue : 0;
      
      return sortDirection === "asc" ? numA - numB : numB - numA;
    });

    return filtered;
  }, [searchTerm, sortField, sortDirection]);

  const columns = [
    { key: "name" as SortField, label: "Jogador" },
    { key: "overall" as SortField, label: "Geral" },
    { key: "pvpServer" as SortField, label: "PVP Server" },
    { key: "pveServer" as SortField, label: "PVE Server" },
    { key: "pvpTorre" as SortField, label: "PVP Torre" },
    { key: "pvpCima" as SortField, label: "PVP Cima" },
    { key: "pvpQuadrado" as SortField, label: "PVP Quadrado" },
    { key: "warVale" as SortField, label: "War Vale" },
    { key: "defesaCristal" as SortField, label: "Defesa Cristal" },
    { key: "scoutAlly" as SortField, label: "Scout Ally" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="h-12 w-12 text-primary animate-pulse-glow" />
              <Swords className="h-12 w-12 text-secondary animate-pulse-glow" style={{ animationDelay: "1s" }} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                MIR4
              </span>
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Lista de Presença - Clan NA21
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Acompanhe a participação dos membros do clan em todos os eventos e atividades
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-border shadow-card p-6 hover:shadow-glow transition-all duration-300 animate-slide-up">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">Total de Jogadores</p>
                  <p className="text-3xl font-bold text-foreground">13</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card p-6 hover:shadow-glow transition-all duration-300 animate-slide-up">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">Presença Média</p>
                  <p className="text-3xl font-bold text-foreground">91%</p>
                  <p className="text-success text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    +5% vs mês anterior
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card p-6 hover:shadow-glow transition-all duration-300 animate-slide-up">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">100% Presença</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Award className="h-6 w-6 text-accent" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-border shadow-card p-6 hover:shadow-glow transition-all duration-300 animate-slide-up">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm font-medium">Taxa de Participação</p>
                  <p className="text-3xl font-bold text-foreground">85%</p>
                  <p className="text-success text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    +12% este mês
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </Card>
          </div>

          {/* Attendance Table */}
          <div className="mt-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Registro de Participação
              </h3>
              <p className="text-muted-foreground">
                Dados detalhados de presença por jogador e tipo de evento
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar jogador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>

              <Card className="overflow-hidden bg-gradient-card border-border shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        {columns.map((column) => (
                          <th
                            key={column.key}
                            className="px-4 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
                            onClick={() => handleSort(column.key)}
                          >
                            <div className="flex items-center gap-2">
                              {column.label}
                              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedData.map((player, index) => (
                        <tr
                          key={player.name}
                          className="border-b border-border hover:bg-muted/20 transition-colors animate-fade-in"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="px-4 py-4">
                            <span className="font-semibold text-foreground">{player.name}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <span className={`font-bold text-lg ${getAttendanceColor(player.overall)}`}>
                                {player.overall}%
                              </span>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getProgressColor(player.overall)} transition-all duration-500`}
                                  style={{ width: `${player.overall}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          {[
                            player.pvpServer,
                            player.pveServer,
                            player.pvpTorre,
                            player.pvpCima,
                            player.pvpQuadrado,
                            player.warVale,
                            player.defesaCristal,
                            player.scoutAlly,
                          ].map((value, i) => (
                            <td key={i} className="px-4 py-4">
                              <span className={`font-semibold ${getAttendanceColor(value)}`}>
                                {value}%
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="text-center text-muted-foreground text-sm">
                Mostrando {filteredAndSortedData.length} de {attendanceData.length} jogadores
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-full">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
              <span className="text-muted-foreground text-sm">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
