import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Calendar, Phone, Mail, Clock, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const ADMIN_PASSWORD = 'popstation2024'; // Simple password protection

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Booking Requests
            </h1>
            <p className="text-muted-foreground mt-1">
              {bookings?.length || 0} total requests
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading bookings...
          </div>
        ) : bookings && bookings.length > 0 ? (
          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-card">
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Preferred</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
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
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No booking requests yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
