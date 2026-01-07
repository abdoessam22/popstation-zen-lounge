import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Calendar, Phone, Mail, Clock, FileText, Download, Filter, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const ADMIN_PASSWORD = 'popstation2024';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Filters
  const [dateFilter, setDateFilter] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [therapistFilter, setTherapistFilter] = useState<string>('all');

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isAuthenticated,
  });

  const { data: therapists } = useQuery({
    queryKey: ['admin-therapists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('therapists')
        .select('id, name_ar, name_en')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    },
    enabled: isAuthenticated,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  // Filter bookings
  const filteredBookings = bookings?.filter((booking) => {
    if (dateFilter && booking.preferred_date !== dateFilter) return false;
    if (serviceFilter !== 'all' && booking.service !== serviceFilter) return false;
    if (therapistFilter !== 'all' && booking.therapist_id !== therapistFilter) return false;
    return true;
  });

  // Get unique services for filter
  const uniqueServices = [...new Set(bookings?.map(b => b.service) || [])];

  // Export to CSV
  const exportToCSV = () => {
    if (!filteredBookings || filteredBookings.length === 0) return;

    const headers = ['Date', 'Name', 'Phone', 'Email', 'Service', 'Therapist', 'Preferred Date', 'Preferred Time', 'Notes', 'Status', 'Language'];
    
    const rows = filteredBookings.map((booking) => {
      const therapist = therapists?.find(t => t.id === booking.therapist_id);
      return [
        format(new Date(booking.created_at), 'yyyy-MM-dd HH:mm'),
        booking.name,
        booking.phone,
        booking.email || '',
        booking.service,
        therapist?.name_en || 'No preference',
        booking.preferred_date,
        booking.preferred_time,
        booking.notes || '',
        booking.status,
        booking.language,
      ].map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md p-8 rounded-2xl bg-card border border-border"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Admin Access
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Enter password to view booking requests
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}

            <Button type="submit" variant="gold" className="w-full">
              Access Dashboard
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="luxury-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Booking Requests
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredBookings?.length || 0} of {bookings?.length || 0} requests
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="gold-outline"
              onClick={exportToCSV}
              disabled={!filteredBookings || filteredBookings.length === 0}
            >
              <Download className="w-4 h-4 me-2" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Filters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Date</label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Service</label>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All services</SelectItem>
                  {uniqueServices.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Therapist</label>
              <Select value={therapistFilter} onValueChange={setTherapistFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All therapists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All therapists</SelectItem>
                  {therapists?.map((therapist) => (
                    <SelectItem key={therapist.id} value={therapist.id}>
                      {therapist.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setDateFilter('');
                  setServiceFilter('all');
                  setTherapistFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading bookings...
          </div>
        ) : filteredBookings && filteredBookings.length > 0 ? (
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-card">
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Therapist</TableHead>
                  <TableHead>Preferred</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => {
                  const therapist = therapists?.find(t => t.id === booking.therapist_id);
                  return (
                    <TableRow key={booking.id} className="bg-card/50">
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          {format(new Date(booking.created_at), 'HH:mm')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-foreground">{booking.name}</span>
                        <div className="text-xs text-muted-foreground mt-1">
                          {booking.language.toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span dir="ltr">{booking.phone}</span>
                        </div>
                        {booking.email && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Mail className="w-3 h-3" />
                            {booking.email}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{booking.service}</span>
                        {booking.notes && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <FileText className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{booking.notes}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {therapist ? (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-sm">{therapist.name_en}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">No preference</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(booking.preferred_date), 'MMM dd')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {booking.preferred_time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {bookings && bookings.length > 0 
              ? 'No bookings match your filters'
              : 'No booking requests yet'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
