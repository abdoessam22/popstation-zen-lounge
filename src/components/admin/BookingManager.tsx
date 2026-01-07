import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, Phone, Mail, Clock, FileText, Download, Filter, User, Check, X, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const BookingManager = () => {
  const queryClient = useQueryClient();
  const [dateFilter, setDateFilter] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [therapistFilter, setTherapistFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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
  });

  const { data: therapists } = useQuery({
    queryKey: ['admin-therapists-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('therapists')
        .select('id, name_ar, name_en');
      
      if (error) throw error;
      return data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('booking_requests').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast.success('تم تحديث الحالة');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('booking_requests').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      toast.success('تم حذف الحجز');
    },
    onError: (error) => {
      toast.error('حدث خطأ: ' + error.message);
    },
  });

  // Filter bookings
  const filteredBookings = bookings?.filter((booking) => {
    if (dateFilter && booking.preferred_date !== dateFilter) return false;
    if (serviceFilter !== 'all' && booking.service !== serviceFilter) return false;
    if (therapistFilter !== 'all' && booking.therapist_id !== therapistFilter) return false;
    if (statusFilter !== 'all' && booking.status !== statusFilter) return false;
    return true;
  });

  const uniqueServices = [...new Set(bookings?.map(b => b.service) || [])];

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

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      confirmed: 'default',
      cancelled: 'destructive',
    };
    const labels: Record<string, string> = {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      cancelled: 'ملغي',
    };
    return <Badge variant={variants[status] || 'secondary'}>{labels[status] || status}</Badge>;
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">إدارة الحجوزات</h2>
          <p className="text-muted-foreground text-sm">
            {filteredBookings?.length || 0} من {bookings?.length || 0} حجز
          </p>
        </div>
        <Button
          variant="gold-outline"
          onClick={exportToCSV}
          disabled={!filteredBookings || filteredBookings.length === 0}
        >
          <Download className="w-4 h-4 me-2" />
          تصدير CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">الفلاتر</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">التاريخ</label>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">الخدمة</label>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="كل الخدمات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الخدمات</SelectItem>
                {uniqueServices.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">المعالج</label>
            <Select value={therapistFilter} onValueChange={setTherapistFilter}>
              <SelectTrigger>
                <SelectValue placeholder="كل المعالجين" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل المعالجين</SelectItem>
                {therapists?.map((therapist) => (
                  <SelectItem key={therapist.id} value={therapist.id}>
                    {therapist.name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">الحالة</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="كل الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="confirmed">مؤكد</SelectItem>
                <SelectItem value="cancelled">ملغي</SelectItem>
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
                setStatusFilter('all');
              }}
            >
              مسح الفلاتر
            </Button>
          </div>
        </div>
      </div>

      {filteredBookings && filteredBookings.length > 0 ? (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-card">
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">التواصل</TableHead>
                <TableHead className="text-right">الخدمة</TableHead>
                <TableHead className="text-right">المعالج</TableHead>
                <TableHead className="text-right">الموعد</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
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
                          <span className="text-sm">{therapist.name_ar}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">بدون تفضيل</span>
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
                      {getStatusBadge(booking.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500 hover:text-green-600"
                              onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'confirmed' })}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'cancelled' })}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
                              deleteMutation.mutate(booking.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
            ? 'لا توجد حجوزات تطابق الفلاتر'
            : 'لا توجد حجوزات حتى الآن'}
        </div>
      )}
    </div>
  );
};

export default BookingManager;
