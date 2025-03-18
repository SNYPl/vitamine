"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import CategoriesFilter from "./categories/Categories";
import PriceFilter from "./price/Price";
import { Button, Divider, Collapse, Badge, Drawer } from "antd";
import { FilterOutlined, CloseOutlined, ReloadOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Filter: React.FC = () => {
  const [mobileFilterVisible, setMobileFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const clearAllFilters = () => {
    // Implement clear logic - dispatch actions to reset filters
    console.log("Clearing all filters");
    setActiveFilters(0);
    // You'll need to pass this function to child components
  };

  const FilterContent = () => (
    <div className={style.filterContent}>
      <div className={style.filterHeader}>
        <h3>ფილტრი</h3>
        {activeFilters > 0 && (
          <Button 
            type="text" 
            icon={<ReloadOutlined />} 
            onClick={clearAllFilters}
            className={style.clearButton}
          >
            Clear All
          </Button>
        )}
      </div>
      
      <Divider className={style.divider} />
      
      <Collapse 
        defaultActiveKey={['1', '2']} 
        ghost 
        expandIconPosition="end"
        className={style.filterCollapse}
      >
        <Panel 
          header={<span className={style.filterSectionTitle}>კატეგორიები</span>} 
          key="1"
          className={`${style.filterPanel} ${style.collapseItem}`}
        >
          <CategoriesFilter />
        </Panel>
        
        <Panel 
          header={<span className={style.filterSectionTitle}>Price Range</span>} 
          key="2"
          className={`${style.filterPanel} ${style.collapseItem}`}
        >
          <PriceFilter />
        </Panel>
        
        {/* You can add more filter sections here */}
        {/* 
        <Panel 
          header={<span className={style.filterSectionTitle}>Brand</span>} 
          key="3"
          className={style.filterPanel}
        >
          Brand filters here
        </Panel>
        
       
        */}
      </Collapse>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button - Only visible on small screens */}
      <div className={style.mobileFilterButton}>
        <Button 
          type="primary" 
          icon={<FilterOutlined />}
          onClick={() => setMobileFilterVisible(true)}
          size="large"
        >
          Filters {activeFilters > 0 && <Badge count={activeFilters} size="small" />}
        </Button>
      </div>
      
      {/* Mobile Filter Drawer */}
      <Drawer
        title="Filters"
        placement="left"
        onClose={() => setMobileFilterVisible(false)}
        open={mobileFilterVisible}
        className={style.mobileFilterDrawer}
        closeIcon={<CloseOutlined />}
        width={300}
        bodyStyle={{ padding: '16px' }}
        footer={
          <div className={style.drawerFooter}>
            <Button onClick={() => setMobileFilterVisible(false)}>Cancel</Button>
            <Button 
              type="primary" 
              onClick={() => setMobileFilterVisible(false)}
            >
              Apply
            </Button>
          </div>
        }
      >
        <FilterContent />
      </Drawer>
      
      {/* Desktop Filter Panel - Hidden on small screens */}
      <section className={`${style.filter}`}>
        <FilterContent />
      </section>
    </>
  );
};

export default Filter;
