using SolrNet;
using SolrNet.Commands.Parameters;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using PlataformaTransparencia.Modelos.Proyectos;

namespace PlataformaTransparencia.Negocios
***REMOVED***

    public class MySolrRepository
    ***REMOVED***
        private const string V = "*";
        private readonly ISolrOperations<Modelos.SolrResponse> _solr;

        public MySolrRepository(ISolrOperations<Modelos.SolrResponse> solr)
        ***REMOVED***
            _solr = solr;
    ***REMOVED***

        public async Task<IEnumerable<Modelos.SolrResponse>> Search(string searchString)
        ***REMOVED***
            searchString = searchString.Replace(" ", "\\ ");
            QueryOptions query_options = new QueryOptions ***REMOVED***
                StartOrCursor = new StartOrCursor.Start(0),
                Rows = 250,
                OrderBy = ***REMOVED*** new SortOrder("principal", Order.ASC) ***REMOVED***
        ***REMOVED***;

            SolrQuery query = new SolrQuery(V + searchString + V);
            SolrQuery query2 = new SolrQuery("metadata:*" + searchString + "*");
            var results = await _solr.QueryAsync(query | query2, query_options);

            return results;
    ***REMOVED***

        public async Task<IEnumerable<Modelos.SolrResponse>> Search(string searchString, string Type, int start, int  sort, int rows)
        ***REMOVED***
            int WordsCount= 0;

            if (searchString != null) ***REMOVED***
                WordsCount = searchString.Split(" ").Count();
                searchString = searchString.Replace(" ", "\\ ");
        ***REMOVED***

            if (Type != null && Type != "undefined") ***REMOVED***
                Type = Type.Replace(" ", "\\ ");
        ***REMOVED***

            QueryOptions query_options = new QueryOptions ***REMOVED***
                StartOrCursor = new StartOrCursor.Start(start),
                Rows = rows,
                OrderBy = ***REMOVED*** new SortOrder("principal",(Order) sort) ***REMOVED***  //Order.ASC
        ***REMOVED***;

            SolrQuery query = new SolrQuery('"'+searchString+ '"');
            SolrQuery query2 = new SolrQuery("");

            if (WordsCount > 1) ***REMOVED***
                query2 = new SolrQuery("metadata:"+'"' + searchString + '"');
        ***REMOVED***
            else ***REMOVED***
                query2 = new SolrQuery("metadata:*" + searchString + "*");
        ***REMOVED***

            IEnumerable<Modelos.SolrResponse> results;

            if (Type != null && Type.Length > 0 && Type != "undefined") ***REMOVED***
                SolrQuery query3 = new SolrQuery("type:" + Type);
                var rta = await _solr.QueryAsync((query | query2) & query3, query_options);
                results = rta;
                if (results.Count() > 0) ***REMOVED*** results.ElementAt(0).numFound = rta.NumFound; ***REMOVED***
        ***REMOVED***
            else ***REMOVED***
                var rta = await _solr.QueryAsync(query | query2, query_options);
                results = rta;
                if (results.Count() > 0) ***REMOVED*** results.ElementAt(0).numFound = rta.NumFound; ***REMOVED***
        ***REMOVED***

           

            return results;
    ***REMOVED***

        public async Task<IEnumerable<Modelos.SolrResponse>> Autocomplete(string searchString)
        ***REMOVED***
            searchString = searchString.Replace(" ", "\\ ");

            QueryOptions query_options = new QueryOptions ***REMOVED***
                StartOrCursor = new StartOrCursor.Start(0),
                Rows = 10//,
                //OrderBy = ***REMOVED*** new SortOrder("principal", Order.ASC) ***REMOVED***
        ***REMOVED***;

            SolrQuery query = new SolrQuery(searchString);
            var results = await _solr.QueryAsync(query, query_options);

            return results;
    ***REMOVED***

        public async Task<Modelos.SolrResponse> SearchWithFilters(string searchString)
        ***REMOVED***
            var solrResult = (await _solr.QueryAsync(new SolrMultipleCriteriaQuery(new ISolrQuery[]
              ***REMOVED***
                  new SolrQueryByField("_template", "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
                  new SolrQueryByField("_language", "da"),
                  new SolrQueryByField("_latestversion", "true"),
                  new SolrQueryByField("advertcategorydeprecated_b", "false"),
                  new SolrQueryByField("_title", searchString)
            ***REMOVED*** SolrMultipleCriteriaQuery.Operator.AND), new QueryOptions ***REMOVED*** Rows = 1 ***REMOVED***))
              .FirstOrDefault();

            if (solrResult != null)
                return solrResult;

            return null;
    ***REMOVED***
***REMOVED***
***REMOVED***
