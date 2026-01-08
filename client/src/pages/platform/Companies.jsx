import React from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCompaniesData } from "../../features/platform/companies/hooks/useCompaniesData";
import CompaniesHeader from "../../features/platform/companies/components/CompaniesHeader";
import CompaniesFilters from "../../features/platform/companies/components/CompaniesFilters";
import CompanyCard from "../../features/platform/companies/components/CompanyCard";
import Pagination from "../../features/platform/companies/components/Pagination";
import CompanyDetailsModal from "../../features/platform/companies/components/CompanyDetailsModal";
import DashboardSkeleton from "../../features/platform/dashboard/components/DashboardSkeleton";

export default function Companies() {
    const {
        companies,
        search,
        setSearch,
        page,
        setPage,
        totalPages,
        totalCompanies,
        planFilter,
        setPlanFilter,
        statusFilter,
        setStatusFilter,
        availablePlans,
        selectedCompanyId,
        setSelectedCompanyId,
        handleToggleStatus,
        clearFilters,
        hasActiveFilters,
        loading,
    } = useCompaniesData();

    const { t, i18n } = useTranslation();
    if (loading) return <DashboardSkeleton />
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6 lg:p-10 font-sans text-slate-800 dark:text-slate-200" dir={i18n.dir()}>
            <CompaniesHeader
                search={search}
                onSearchChange={setSearch}
                totalCompanies={totalCompanies}
            />

            <CompaniesFilters
                planFilter={planFilter}
                onPlanFilterChange={setPlanFilter}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                availablePlans={availablePlans}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
            />

            {/* Company Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                    <CompanyCard
                        key={company._id}
                        company={company}
                        onToggleStatus={handleToggleStatus}
                        onViewDetails={setSelectedCompanyId}
                    />
                ))}
            </div>

            {companies.length === 0 && (
                <div className="text-center py-20">
                    <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-slate-400 dark:text-slate-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">{t('platform.companies.empty.title')}</h3>
                    <p className="text-slate-500 dark:text-slate-400">{t('platform.companies.empty.message')}</p>
                </div>
            )}

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />

            {/* Details Modal */}
            {selectedCompanyId && (
                <CompanyDetailsModal
                    companyId={selectedCompanyId}
                    onClose={() => setSelectedCompanyId(null)}
                    onToggleStatus={handleToggleStatus}
                />
            )}
        </div>
    );
}
