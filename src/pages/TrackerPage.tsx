import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Trash2, Heart, AlertCircle } from 'lucide-react';

interface CycleEntry {
  id: string;
  startDate: string;
  endDate?: string;
  cycleLength: number;
  notes?: string;
  symptoms?: string[];
}

const TrackerPage: React.FC = () => {
  const [entries, setEntries] = useState<CycleEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<CycleEntry | null>(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    cycleLength: 28,
    notes: '',
    symptoms: [] as string[]
  });

  const commonSymptoms = [
    'Cramps', 'Heavy Flow', 'Irregular Timing', 'Mood Changes',
    'Acne Flare-ups', 'Weight Gain', 'Fatigue', 'Headaches',
    'Bloating', 'Breast Tenderness', 'Food Cravings', 'Sleep Issues'
  ];

  useEffect(() => {
    const savedEntries = localStorage.getItem('pcosTracker');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pcosTracker', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: CycleEntry = {
      id: editingEntry?.id || Date.now().toString(),
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      cycleLength: formData.cycleLength,
      notes: formData.notes || undefined,
      symptoms: formData.symptoms.length > 0 ? formData.symptoms : undefined
    };

    if (editingEntry) {
      setEntries(entries.map(entry => entry.id === editingEntry.id ? newEntry : entry));
    } else {
      setEntries([newEntry, ...entries]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      startDate: '',
      endDate: '',
      cycleLength: 28,
      notes: '',
      symptoms: []
    });
    setShowForm(false);
    setEditingEntry(null);
  };

  const handleEdit = (entry: CycleEntry) => {
    setEditingEntry(entry);
    setFormData({
      startDate: entry.startDate,
      endDate: entry.endDate || '',
      cycleLength: entry.cycleLength,
      notes: entry.notes || '',
      symptoms: entry.symptoms || []
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const toggleSymptom = (symptom: string) => {
    const updatedSymptoms = formData.symptoms.includes(symptom)
      ? formData.symptoms.filter(s => s !== symptom)
      : [...formData.symptoms, symptom];
    setFormData({ ...formData, symptoms: updatedSymptoms });
  };

  const getPredictions = () => {
    if (entries.length === 0) return null;

    const latestEntry = entries[0];
    const startDate = new Date(latestEntry.startDate);
    const avgCycleLength = entries.reduce((sum, entry) => sum + entry.cycleLength, 0) / entries.length;
    
    const nextPeriod = new Date(startDate);
    nextPeriod.setDate(startDate.getDate() + avgCycleLength);
    
    const ovulationDate = new Date(nextPeriod);
    ovulationDate.setDate(nextPeriod.getDate() - 14);

    return {
      nextPeriod: nextPeriod.toLocaleDateString(),
      ovulation: ovulationDate.toLocaleDateString(),
      avgCycleLength: Math.round(avgCycleLength)
    };
  };

  const predictions = getPredictions();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Period Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your menstrual cycles to better understand your patterns and manage PCOS symptoms.
          </p>
        </div>

        {/* Predictions Card */}
        {predictions && (
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Your Cycle Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Next Period</p>
                <p className="text-lg font-bold text-purple-600">{predictions.nextPeriod}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Estimated Ovulation</p>
                <p className="text-lg font-bold text-pink-600">{predictions.ovulation}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Average Cycle</p>
                <p className="text-lg font-bold text-teal-600">{predictions.avgCycleLength} days</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Entry Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Cycle History</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Entry
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {editingEntry ? 'Edit' : 'Add'} Cycle Entry
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Period Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Period End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cycle Length (days) *
                  </label>
                  <input
                    type="number"
                    required
                    min="15"
                    max="50"
                    value={formData.cycleLength}
                    onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symptoms
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonSymptoms.map(symptom => (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => toggleSymptom(symptom)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.symptoms.includes(symptom)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any additional notes about this cycle..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    {editingEntry ? 'Update' : 'Add'} Entry
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No entries yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your cycles to see patterns and predictions.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Add Your First Entry
              </button>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {new Date(entry.startDate).toLocaleDateString()}
                          {entry.endDate && ` - ${new Date(entry.endDate).toLocaleDateString()}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          Cycle Length: {entry.cycleLength} days
                        </p>
                      </div>
                    </div>

                    {entry.symptoms && entry.symptoms.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Symptoms:</h4>
                        <div className="flex flex-wrap gap-2">
                          {entry.symptoms.map((symptom, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {entry.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
                        <p className="text-sm text-gray-600">{entry.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Important Note</h3>
          </div>
          <p className="text-yellow-700">
            This tracker provides estimates based on your cycle history. PCOS can cause irregular cycles, 
            so predictions may vary. Always consult your healthcare provider for personalized guidance and 
            share your tracking data during appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackerPage;