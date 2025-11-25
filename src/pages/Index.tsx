import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: 'career' | 'health' | 'education' | 'finance';
}

const goalsData: Goal[] = [
  {
    id: '1',
    title: 'Главный инженер проекта',
    description: 'Возглавить крупный инженерный проект по разработке нового механизма',
    progress: 45,
    category: 'career'
  },
  {
    id: '2',
    title: 'Сертификация PMP',
    description: 'Получить международный сертификат Project Management Professional',
    progress: 30,
    category: 'career'
  },
  {
    id: '3',
    title: 'Освоить CAD/CAM системы',
    description: 'Углубленное изучение SolidWorks и AutoCAD для 3D моделирования',
    progress: 65,
    category: 'education'
  },
  {
    id: '4',
    title: 'Магистратура по машиностроению',
    description: 'Поступить в топовый вуз на программу Advanced Manufacturing',
    progress: 20,
    category: 'education'
  },
  {
    id: '5',
    title: 'Здоровая спина',
    description: 'Регулярные упражнения и правильная осанка за рабочим столом',
    progress: 70,
    category: 'health'
  },
  {
    id: '6',
    title: 'Спортивный режим',
    description: 'Тренировки 3 раза в неделю для поддержания физической формы',
    progress: 55,
    category: 'health'
  },
  {
    id: '7',
    title: 'Финансовая подушка',
    description: 'Накопить резерв на 6 месяцев жизни для финансовой стабильности',
    progress: 40,
    category: 'finance'
  },
  {
    id: '8',
    title: 'Инвестиционный портфель',
    description: 'Сформировать диверсифицированный портфель из акций и облигаций',
    progress: 25,
    category: 'finance'
  }
];

const categoryConfig = {
  career: {
    name: 'Карьера',
    icon: 'Briefcase',
    color: 'bg-career',
    textColor: 'text-career',
    borderColor: 'border-career'
  },
  health: {
    name: 'Здоровье',
    icon: 'Heart',
    color: 'bg-health',
    textColor: 'text-health',
    borderColor: 'border-health'
  },
  education: {
    name: 'Образование',
    icon: 'GraduationCap',
    color: 'bg-education',
    textColor: 'text-education',
    borderColor: 'border-education'
  },
  finance: {
    name: 'Финансы',
    icon: 'TrendingUp',
    color: 'bg-finance',
    textColor: 'text-finance',
    borderColor: 'border-finance'
  }
};

const Index = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredGoals = selectedCategory
    ? goalsData.filter(goal => goal.category === selectedCategory)
    : goalsData;

  const getCategoryProgress = (category: string) => {
    const categoryGoals = goalsData.filter(g => g.category === category);
    const avgProgress = categoryGoals.reduce((sum, g) => sum + g.progress, 0) / categoryGoals.length;
    return Math.round(avgProgress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 font-heading">
            Дерево жизненных целей
          </h1>
          <p className="text-xl text-gray-600 mb-2">Инженер-механик</p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Путь к профессиональному росту
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(categoryConfig).map(([key, config]) => {
            const progress = getCategoryProgress(key);
            const isSelected = selectedCategory === key;
            
            return (
              <Card
                key={key}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  isSelected ? `ring-4 ${config.borderColor} shadow-xl` : ''
                } animate-scale-in`}
                onClick={() => setSelectedCategory(isSelected ? null : key)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${config.color} p-3 rounded-xl text-white`}>
                    <Icon name={config.icon as any} size={28} />
                  </div>
                  <h3 className="text-xl font-bold font-heading">{config.name}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Прогресс</span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  {goalsData.filter(g => g.category === key).length} {key === 'career' || key === 'finance' ? 'целей' : 'цели'}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold font-heading text-gray-800">
            {selectedCategory ? categoryConfig[selectedCategory as keyof typeof categoryConfig].name : 'Все цели'}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <Icon name="X" size={16} />
              Показать все
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGoals.map((goal, index) => {
            const config = categoryConfig[goal.category];
            const isSelected = selectedGoal === goal.id;
            
            return (
              <Card
                key={goal.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isSelected ? 'ring-4 ring-purple-400 shadow-2xl' : ''
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedGoal(isSelected ? null : goal.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`${config.color} p-3 rounded-xl text-white flex-shrink-0`}>
                    <Icon name={config.icon as any} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800 font-heading">{goal.title}</h3>
                      <Badge className={`${config.color} text-white ml-2`}>
                        {goal.progress}%
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{goal.description}</p>
                    <div className="space-y-2">
                      <Progress value={goal.progress} className="h-3" />
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Icon name="Target" size={14} />
                        <span>
                          {goal.progress < 30 && 'Начальный этап'}
                          {goal.progress >= 30 && goal.progress < 60 && 'В процессе'}
                          {goal.progress >= 60 && 'Активно развиваю'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Icon name="Rocket" size={32} />
              <h3 className="text-2xl font-bold font-heading">Общий прогресс</h3>
            </div>
            <div className="max-w-md mx-auto">
              <Progress 
                value={Math.round(goalsData.reduce((sum, g) => sum + g.progress, 0) / goalsData.length)} 
                className="h-4 bg-white/20"
              />
              <p className="text-3xl font-bold mt-4">
                {Math.round(goalsData.reduce((sum, g) => sum + g.progress, 0) / goalsData.length)}%
              </p>
              <p className="text-white/80 mt-2">пути к достижению всех целей пройдено</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
